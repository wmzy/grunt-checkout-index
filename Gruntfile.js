/*
 * grunt-copy-git-index
 *
 * Copyright (c) 2015 wmzy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: {
				src: [
					'Gruntfile.js',
					'tasks/**/*.js',
					'test/**/*.js'
				],
				options: {
					jshintrc: true
				}
			}
		},
		jscs: {
			src: [
				'Gruntfile.js',
				'tasks/**/*.js',
				'test/**/*.js'
			],
			options: {
				config: '.jscsrc',
				verbose: true // If you need output with rule names http://jscs.info/overview.html#verbose
			}
		},
		mochaTest: {
			src: ['test/*.js'],
			options: {
				reporter: 'spec',
				require: [
					function () {
						var should = require('should');
					}
				]
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	grunt.registerTask('build', 'Build plugin.', function () {
		// todo: build
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Whenever the "test" task is run, run the "unit-test" task.
	grunt.registerTask('test', ['jshint', 'jscs', 'mochaTest']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['test', 'build']);

};