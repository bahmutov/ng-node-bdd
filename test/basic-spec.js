var benv = require('benv');
var ngBdd = require('..');

describe('test value', function () {

  beforeEach(function setupEnvironment(done) {
    benv.setup(function () {
      benv.expose({
        angular: benv.require('../bower_components/angular/angular.js', 'angular')
      });

      done();
    });
  });

  afterEach(function () {
    benv.teardown(true);
  });

  beforeEach(function loadMyApp() {
    angular.module('foo', []).value('bar', 'baz');
  });

  ngBdd.ngIt('gets value', ['foo'], function (bar) {
    console.assert(bar === 'baz');
  });

});
