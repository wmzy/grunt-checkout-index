// jscs: disable
/*
 * grunt-copy-git-index
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 wmzy
 * Licensed under the MIT license.
 * https://github.com/wmzy/grunt-copy-git-index/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var fs = require('fs');
  var chalk = require('chalk');
  var git = require('nodegit');
  var Status = git.Status;
  var Checkout = git.Checkout;
  var _ = grunt.util._;

  grunt.registerMultiTask('copyGitIndex', 'Copy files from git index.', function() {
    var options = this.options({
      targetDirectory: null,
      clean: true
    });

    if (!options.targetDirectory) return new Error('no targetDirectory option');

    var taskDone = this.async();
    var filesInIndex = [];
    var promiseResults = {};
    git.Repository.open('./.git').then(function (repository) {
      promiseResults.repository = repository;
      return Status.foreachExt(repository, {show: Status.SHOW.INDEX_ONLY}, function (file) {
        filesInIndex.push(file);
      });
    }).then(function () {
      return promiseResults.repository.index();
    }).then(function (index) {
      if (options.clean) grunt.file.delete(options.targetDirectory, {force: true});
      return Checkout.index(promiseResults.repository, index, {
        targetDirectory: options.targetDirectory,
        paths: filesInIndex,
        checkoutStrategy: Checkout.STRATEGY.FORCE
      });
    }).then(function () {
      return taskDone();
    }).catch(taskDone);
  });
};
