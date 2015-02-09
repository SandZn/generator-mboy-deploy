'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
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
        default: 'git@monkeeboy.git.beanstalkapp.com:/monkeeboy/PROJECTREPONAME.git'
      }, {
        name: 'projectDomain',
        message: 'What is the domain for this project?',
        default: 'PROJECTDOMAIN.com'
      }, {
        type: 'list',
        name: 'projectDomainRoot',
        message: 'Will this project be forced to use www or the root domain?',
        choices: [ '_', 'www' ]
      }, {
        type: 'confirm',
        name: 'optionWordPress',
        message: 'Does this project use WordPress?',
        default: false
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

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.repoUrl = props.repoUrl;
      this.projectDomain = props.projectDomain;
      this.projectDomainRoot = props.projectDomainRoot;
      this.optionWordPress = props.optionWordPress;
      this.optionNpm = props.optionNpm;
      this.optionBower = props.optionBower;
      var linkedDirs = [],
          linkedFiles = [];

      // Compile linked_dirs and linked_files
      if(this.optionWordPress) {
        linkedDirs.push('wp-content/uploads');
        linkedFiles.push('wp-config.php');
      }

      if(this.optionNpm) {
        linkedDirs.push('node_modules');
      }

      if(this.optionBower) {
        linkedDirs.push('bower_components');
      }

      this.linkedDirs = linkedDirs.join(' ');
      this.linkedFiles = linkedFiles.join(' ');

      done();
    }.bind(this));
  },

  writing: {
    deployfiles: function () {
      this.copy('Capfile', 'Capfile');
      this.mkdir('config');
      this.mkdir('config/deploy');
      this.template('config/deploy.rb', 'config/deploy.rb');
      this.template('config/deploy/production.rb', 'config/deploy/production.rb');
      this.template('config/deploy/dev.rb', 'config/deploy/dev.rb');
    }
  },

  install: function () {
    this.log('\nYour deploy files are good to go. Don\'t forget to double check your answers. When you are ready you should be good to deploy.\n' + chalk.green('May the code be with you.'));
  }
});
