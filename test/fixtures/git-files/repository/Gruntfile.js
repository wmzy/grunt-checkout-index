/*
 * Grunt-copy-git-index
 *
 * Copyright (c) 2015 wmzy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    copyGitIndex: {
      withoutExtraOptions: {
      },
      override: {
        options: {
          clean: false
        }
      },
      options: {
        targetDirectory: '../index-files'
      }
    }
  });
};
