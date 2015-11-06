'use strict';

var os = require('os');
var path = require('path');
var grunt = require('grunt');
var git = require('nodegit');

var fixtures = path.join(__dirname, 'fixtures');
var gitFiles = path.join(fixtures, 'git-files');
var spawn = require('child_process').spawn;
var tmpdir = path.join(os.tmpdir(), 'grunt-copy-git-index');
var gitDir = path.join(tmpdir, 'git-repository');
var indexFilesDir = path.join(tmpdir, 'index-files');
var repository;

describe('grunt-copy-git-index', function () {
  describe('when run with no options specified', function () {
    before(function (done) {
      // create git repository

      grunt.file.delete(gitDir, {force: true});
      grunt.file.mkdir(gitDir);

      grunt.file.recurse(gitFiles, function (abspath, rootdir, subdir, filename) {
        grunt.file.copy(abspath, path.join(gitDir, subdir || '', filename));
      });
      git.Repository.init(gitDir, 0).then(function (repo) {
        repository = repo;
        console.log('git workdir:', repo.workdir());
        return repo.index();
      }).then(function (index) {
        var returnCode = index.addByPath('app.js') || index.write();
        if (returnCode) return done(new Error('git add files failed with code ' + returnCode));
        console.log('git add files success');
        done();
      }, done);
    });

    it('should copy files from git index', function () {
    });
  });
});
