# config valid only for version of Capistrano
lock '3.5.0'

# Load up the mBoy gem
Mboy.new() # Setting initial defaults.

set :application, '<%= projectNameString %>' # no spaces or special characters
set :project_name, '<%= projectName %>' # pretty name that can have spaces
set :repo_url, '<%= repoUrl %>' # the git repo url
set :current_dir, 'public_html' # almost always public_html

<% if (projectType === 'mbCMS') { %>
set :config_repo_url, '<%= mbcmsConfigRepoUrl %>'
set :git_strategy, Capistrano::Git::SlaveStrategy
<% } %>

# Default value for :linked_files is []
<% if (linkedFiles) { %>set :linked_files, %w{<%= linkedFiles %>} # Note that this file must exist on the server already, Capistrano will not create it.<% } else { %>#set :linked_files, %w{} # Note that this file must exist on the server already, Capistrano will not create it.<% } %>

# Default value for linked_dirs is []
<% if (linkedDirs) { %>set :linked_dirs, %w{<%= linkedDirs %>}<% } else { %>#set :linked_dirs, %w{} # Note that Capistrano will create these directories if needed.<% } %>

namespace :deploy do
  STDOUT.sync

  desc 'Build'
  after :updated, :deploybuild do
    on roles(:web) do
      within release_path  do
        <% if (optionNpm) { %>invoke 'build:npm'<% } %>
        <% if (optionBower) { %>invoke 'build:bower'<% } %>
        <% if (projectType === 'mbCMS') { %>
        invoke 'build:configsetup'
        invoke 'build:clearcache'
        invoke 'build:migrations'
        <% } %>
      end
    end
  end

  desc 'mBoy Deployment Initialized.'
  Mboy.deploy_starting_message

  <% if (projectType !== 'mbCMS') { %>
  desc 'Tag this release in git.'
  Mboy.tag_release
  <% } %>

  <% if (projectType === 'mbCMS') { %>
  desc 'Tag this release in git.'
  after :updated, :tagrelease do
    on roles(:web) do
      within release_path do
        set(:current_revision, capture(:cat, 'REVISION'))
        resolved_release_path = capture(:pwd, "-P")
        set(:release_name, resolved_release_path.split('/').last)
      end
    end

    run_locally do
      tag_msg = "Deployed by #{fetch :human} to #{fetch :stage} as #{fetch :release_name}"
      tag_name = "#{fetch :stage }-#{fetch :release_name}"
      execute :gits, %(tag -a #{tag_name} -m "#{tag_msg}")
      execute :gits, "push --tags"
    end
  end
  <% } %>

  desc 'mBoy HipChat Notifications'
  Mboy.hipchat_notify

end

namespace :build do
  <% if (optionNpm) { %>
  desc 'Install/update node packages.'
  task :npm do
    on roles(:web) do
      within release_path do
        execute :npm, 'install --silent --no-spin' # install packages
      end
    end
  end
  <% } if (optionBower) { %>
  desc 'Install/update bower components.'
  task :bower do
    on roles(:web) do
      within release_path do
        execute :bower, 'install' # install components
      end
    end
  end<% } %>

  <% if (projectType === 'mbCMS') { %>
  desc 'Setup mbCMS Config files.'
  task :configsetup do
    on roles(:web) do
      within release_path do
        execute :git, :clone, '-b', fetch(:branch), '--single-branch', fetch(:config_repo_url), 'mbcms_config'
        execute :perl, 'scripts/symlink-configs.pl'
      end
    end
  end

  desc 'Clear mbCMS cache.'
  task :clearcache do
    on roles(:web) do
      within release_path do
        execute :perl, 'scripts/run_clearcache.pl', "#{shared_path}"
      end
    end
  end

  desc 'Run database migrations.'
  task :migrations do
    on roles(:web) do
      within release_path do
        execute :perl, 'scripts/run_migrations.pl', "#{release_path}"
      end
    end
  end
  <% } %>

end
