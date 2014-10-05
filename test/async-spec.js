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
    angular.module('foo', [])
      .service('add', function ($q, $timeout) {
        return function add(a, b) {
          var deferred = $q.defer();
          $timeout(function () {
            deferred.resolve(a + b);
          }, 1000);
          return deferred.promise;
        };
      });
  });

  ngBdd.ngIt('adds numbers', ['foo'], function (add, done) {
    return add(2, 3).then(function (result) {
      console.log('result', result);
      console.assert(result === 5);
      done();
    });
  });

});
