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

    this.log([
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

    this.log('I am going to generate the default Monkee-Boy deployment config. For more details on this default template please refer to the mBoy Deploy Templates repo.');

    this.log('\n\nTo get started I have a few questions to ask. These allow me to customize the deploy config a little for you. You can leave the defaults for any or all of these if you wish to modify them yourself.');

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
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.repoUrl = props.repoUrl;
      this.projectDomain = props.projectDomain;
      this.projectDomainRoot = props.projectDomainRoot;

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
    // this.installDependencies({
    //   skipInstall: this.options['skip-install'],
    //   bower: false
    // });
  }
});
