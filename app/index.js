'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var string = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    this.log(['\n',
      chalk.yellow(' ##     ##    #####    ##    ##   ##   ##  #######  #######         #####      #####   ##    ##'),
      chalk.yellow('###    ###   #######   ###   ##   ##  ##   #######  #######         ######    #######  ##    ##'),
      chalk.yellow('####   ###  ##     ##  ###   ##   ## ##    ##       ##              ##  ##   ##     ## ##    ##'),
      chalk.yellow('####  ####  ##     ##  ####  ##   ####     ##       ##              ##  ##   ##     ##  ##  ##'),
      chalk.yellow('## #### ##  ##     ##  ## ## ##   ####     ######   ######   ####   ######   ##     ##   ####'),
      chalk.yellow('##  ##  ##  ##     ##  ## ## ##   #####    ######   ######   ####   ######   ##     ##    ##'),
      chalk.yellow('##  ##  ##  ##     ##  ##  ####   ## ###   ##       ##              ##   ##  ##     ##    ##'),
      chalk.yellow('##      ##  ##     ##  ##   ###   ##  ##   ##       ##              ##   ##  ##     ##    ##'),
      chalk.yellow('##      ##   #######   ##   ###   ##   ##  #######  #######         #######   #######     ##'),
      chalk.yellow('##      ##    #####    ##    ##   ##   ### #######  #######         ######     #####      ##')].join('\n')
    );

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.green('mBoy Deploy') + ' generator!'
    ));

    this.log('I am going to generate the default Monkee-Boy deployment config. For more details on this\ndefault template please refer to the mBoy Deploy Templates repo.\n');

    this.log('To get started I have a few questions to ask. These allow me to customize the deploy config\na little for you. You can leave the defaults for any or all of these if you wish to modify them yourself.\n');

    var prompts = [
      {
        name: 'projectName',
        message: 'What would you like to call this project (typically client name)?',
        default: 'Project Name'
      }, {
        name: 'repoUrl',
        message: 'What is the git repo url for this project?',
        default: 'git@bitbucket.org:monkeeboy/PROJECTREPONAME.git'
      }, {
        name: 'projectDomain',
        message: 'What is the domain for this project?',
        default: 'PROJECTDOMAIN.com'
      }, {
        type: 'list',
        name: 'projectDomainRoot',
        message: 'Will this project be forced to use www or the root domain?',
        choices: ['_', 'www', 'subdomain']
      }, {
        name: 'projectDomainRootSubdomain',
        message: 'What subdomain will this project be deployed to?',
        default: 'client',
        when: function(answers) {
          if (answers.projectDomainRoot === 'subdomain') {
            return true;
          } else {
            return false;
          }
        }
      }, {
        type: 'confirm',
        name: 'optionWordPress',
        message: 'Does this project use WordPress?',
        default: false
      }, {
        name: 'optionWordPressThemeDir',
        message: 'What is the name of the active theme directory (the directory name, not the theme name)?',
        default: 'client-theme',
        when: function(answers) {
          if (answers.optionWordPress === true) {
            return true;
          } else {
            return false;
          }
        }
      }, {
        type: 'confirm',
        name: 'optionNpm',
        message: 'Does this project use npm to manage packages?',
        default: true
      }, {
        type: 'confirm',
        name: 'optionBower',
        message: 'Does this project use Bower to manage components?',
        default: true
      }
    ];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;
      this.projectNameString = string.slugify(props.projectName);
      this.repoUrl = props.repoUrl;
      this.projectDomain = props.projectDomain;
      if (typeof props.projectDomainRootSubdomain !== 'undefined') {
        this.projectDomainRoot = props.projectDomainRootSubdomain;
        this.projectSubdomain = props.projectDomainRootSubdomain;
      } else {
        this.projectDomainRoot = props.projectDomainRoot;
        this.projectSubdomain = false;
      }

      this.optionWordPress = props.optionWordPress;
      if (typeof props.optionWordPressThemeDir !== 'undefined') {
        this.optionWordPressThemeDir = props.optionWordPressThemeDir;
      } else {
        this.optionWordPressThemeDir = false;
      }

      this.optionNpm = props.optionNpm;
      this.optionBower = props.optionBower;
      var linkedDirs = [];
      var linkedFiles = [];

      // Compile linked_dirs and linked_files
      if (this.optionWordPress) {
        linkedDirs.push('wp-content/uploads');
        linkedFiles.push('.htaccess', 'wp-config.php');
      }

      if (this.optionNpm) {
        linkedDirs.push('node_modules');
      }

      if (this.optionBower) {
        linkedDirs.push('bower_components');
      }

      if (this.optionBower && this.optionWordPressThemeDir !== false) {
        linkedDirs.push('wp-content/themes/' + this.optionWordPressThemeDir + '/components');
      }

      this.linkedDirs = linkedDirs.join(' ');
      this.linkedFiles = linkedFiles.join(' ');

      done();
    }.bind(this));
  },

  writing: {
    deployfiles: function() {
      this.copy('Capfile', 'Capfile');
      this.template('config/deploy.rb', 'config/deploy.rb');
      this.template('config/deploy/production.rb', 'config/deploy/production.rb');
      this.template('config/deploy/dev.rb', 'config/deploy/dev.rb');
    }
  },

  install: function() {
    this.log('\nYour deploy files are good to go. Don\'t forget to double check your answers. When you are ready you should be good to deploy.\n' + chalk.green('May the code be with you.'));
  }
});
