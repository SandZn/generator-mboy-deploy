'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('mboy-deploy:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withPrompt({
        projectName: 'Something Something Darkside',
        repoUrl: 'git@monkeeboy.git.beanstalkapp.com:/monkeeboy/somethingsomethingdarkside.git',
        projectDomain: 'somethingsomethingdarkside.com'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Capfile',
      'config/deploy.rb',
      'config/deploy/production.rb',
      'config/deploy/dev.rb'
    ]);
  });
});
