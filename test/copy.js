'use strict';

var os = require('os');
var path = require('path');
var grunt = require('grunt');
var git = require('nodegit');

var fixtures = path.join(__dirname, 'fixtures');
var gitFiles = path.join(fixtures, 'git-files');
var gitFilesInRepository = path.join(gitFiles, 'repository');
var gitFilesInIndex = path.join(gitFiles, 'index');
var gitFilesInWork = path.join(gitFiles, 'work');
var spawn = require('child_process').spawn;
var tmpdir = path.join(os.tmpdir(), 'grunt-copy-git-index');
var gitDir = path.join(tmpdir, 'git-repository');
var indexFilesDir = path.join(tmpdir, 'index-files');

describe('grunt-copy-git-index', function () {
  describe('when run with no options specified', function () {
    before(function (done) {
      // Create git repository

      var promiseResults = {};
      grunt.file.delete(gitDir, {force: true});
      grunt.file.mkdir(gitDir);

      git.Repository.init(gitDir, 0).then(function (repo) {
        promiseResults.repository = repo;
        console.log('git workdir:', repo.workdir());
        return repo.index();
      }).then(function (index) {
        promiseResults.index = index;
        grunt.file.recurse(gitFilesInRepository, function (abspath, rootdir, subdir, filename) {
          grunt.file.copy(abspath, path.join(gitDir, subdir || '', filename));
        });
        return index.addAll();
      }).then(function (returnCode) {
        if (returnCode || promiseResults.index.write()) throw new Error('git add files failed with code ' + returnCode);
        console.log('git add files success');

        // Commit files
        return promiseResults.index.writeTree();
      }).then(function (oid) {
        promiseResults.oid = oid;
        var author = git.Signature.now('wmzy', '1256573276@qq.com');
        var committer = author;
        return promiseResults.repository
          .createCommit('HEAD', author, committer, 'first commit, no HEAD', oid, []);
      }).then(function () {
        grunt.file.recurse(gitFilesInIndex, function (abspath, rootdir, subdir, filename) {
          grunt.file.copy(abspath, path.join(gitDir, subdir || '', filename));
        });
        return promiseResults.index.addAll();
      }).then(function (returnCode) {
        if (returnCode || promiseResults.index.write()) throw new Error('git add files failed with code ' + returnCode);
        console.log('git add files success');

        grunt.file.recurse(gitFilesInWork, function (abspath, rootdir, subdir, filename) {
          grunt.file.copy(abspath, path.join(gitDir, subdir || '', filename));
        });

        done();
      }).catch(done);
    });

    it('should copy files from git index', function (done) {
      var copyProcess = spawn(
        'grunt',
        ['--tasks', path.resolve('tasks'), 'copyGitIndex:withoutOptions'],
        {cwd: gitDir}
      );
      copyProcess.on('close', function () {
        grunt.file.recurse(gitFilesInIndex, function (abspath, rootdir, subdir, filename) {
          grunt.file.exists(indexFilesDir, subdir || '', filename).should.be.ok();
        });
        grunt.file.recurse(indexFilesDir, function (abspath, rootdir, subdir, filename) {
          grunt.file.exists(gitFilesInIndex, subdir || '', filename).should.be.ok();
        });

        done();
      });

      copyProcess.on('error', done);
    });
  });
});
