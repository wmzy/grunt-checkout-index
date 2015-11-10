/*
 * Grunt-copy-git-index
 *
 * Copyright (c) 2015 wmzy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    copyGitIndex: {
      withoutOptions: {
        files: [{src: ['**.*'], dest: '../index-files'}]
      }
    }
  });

  // Actually load this plugin's task(s).
  // grunt.loadTasks('tasks');
};
