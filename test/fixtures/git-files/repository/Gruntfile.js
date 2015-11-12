/*
 * Grunt-checkout-index
 *
 * Copyright (c) 2015 wmzy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    checkoutIndex: {
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
