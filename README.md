# grunt-checkout-index v0.0.0 [![Build Status: Linux](https://travis-ci.org/wmzy/grunt-checkout-index.svg?branch=master)](https://travis-ci.org/wmzy/grunt-checkout-index) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/j04ik7qgx21ixyfw/branch/master?svg=true)](https://ci.appveyor.com/project/wmzy/grunt-checkout-index/branch/master)

> Checkout files from git index.



## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-checkout-index --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-checkout-index');
```




## Checkout-index task
_Run this task with the `grunt checkoutIndex` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.


### Options


#### targetDirectory
Type: `String`  
Default: `null`

You should give this option to point where to save your files.

#### clean
Type: `Boolean`  
Default: `true`

Clean the target directory before checkout files.
