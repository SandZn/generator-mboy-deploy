/*global describe, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('assert');
var _ = require('underscore');

describe('mboy-deploy:app', function () {
  if ('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  var prompts = { };

  var expected = [
    'Capfile',
    'config/deploy.rb',
    'config/deploy/production.rb',
    'config/deploy/dev.rb',
    'config/deploy/staging.rb'
  ];

  var options = { };

  var runGen;

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .withGenerators([
          [helpers.createDummyGenerator(), 'mboy-deploy:app']
        ]);
      done();
    });
  });

  it('creates files with default prompts', function (done) {
    runGen.withOptions(options).withPrompts(
      _.extend(prompts, {
        'projectName': '',
        'repoUrl': '',
        'projectDomain': '',
        'projectDomainRoot': 0,
        'projectType': 'Other',
        'configRepoUrl': false,
        'optionWordPressThemeDir': false,
        'optionNpm': true,
        'optionBower': true,
      })
    ).on('end', function () {
      assert.file(expected);
      done();
    });
  });

  it('creates files with custom prompts as mbCMS', function (done) {
    runGen.withOptions(options).withPrompts(
      _.extend(prompts, {
        'projectName': 'Something Something Darkside',
        'repoUrl': 'git@github.com:Monkee-Boy/generator-mboy-deploy.git',
        'projectDomain': 'monkee-boy.com',
        'projectDomainRoot': 1,
        'projectType': 'mbCMS',
        'configRepoUrl': 'git@github.com:Monkee-Boy/generator-mboy-deploy-config.git',
        'optionNpm': true,
        'optionBower': true,
      })
    ).on('end', function () {
      assert.file(expected);
      done();
    });
  });

  it('creates files with custom prompts as WordPress', function (done) {
    runGen.withOptions(options).withPrompts(
      _.extend(prompts, {
        'projectName': 'Something Something Darkside',
        'repoUrl': 'git@github.com:Monkee-Boy/generator-mboy-deploy.git',
        'projectDomain': 'monkee-boy.com',
        'projectDomainRoot': 1,
        'projectType': 'WordPress',
        'optionWordPressThemeDir': 'client-theme',
        'optionNpm': true,
        'optionBower': true,
      })
    ).on('end', function () {
      assert.file(expected);
      done();
    });
  });

  it('creates files with custom prompts but no addons', function (done) {
    runGen.withOptions(options).withPrompts(
      _.extend(prompts, {
        'projectName': 'Something Something Darkside',
        'repoUrl': 'git@github.com:Monkee-Boy/generator-mboy-deploy.git',
        'projectDomain': 'monkee-boy.com',
        'projectDomainRoot': 0,
        'projectType': 'Other',
        'optionWordPressThemeDir': false,
        'optionNpm': false,
        'optionBower': false,
      })
    ).on('end', function () {
      assert.file(expected);
      done();
    });
  });

  it('creates files with custom subdomain', function (done) {
    runGen.withOptions(options).withPrompts(
      _.extend(prompts, {
        'projectName': 'Something Something Darkside',
        'repoUrl': 'git@github.com:Monkee-Boy/generator-mboy-deploy.git',
        'projectDomain': 'monkee-boy.com',
        'projectDomainRoot': 'subdomain',
        'projectDomainRootSubdomain': 'test',
        'projectType': 'Other',
        'optionWordPressThemeDir': false,
        'optionNpm': false,
        'optionBower': false,
      })
    ).on('end', function () {
      assert.file(expected);
      done();
    });
  });
});
