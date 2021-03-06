/* global it, angular */
function ngIt(name, deps, cb) {
  if (arguments.length !== 3) {
    throw new Error('Expected 3 arguments to ngIt: name, modules to inject, test function');
  }
  if (typeof deps === 'string') {
    deps = [deps];
  }

  it(name, function (done) {
    var testDependencies = angular.injector([]).annotate(cb);
    var isAsyncTest = testDependencies.indexOf('done') !== -1;

    var m = angular.module('test-module', deps);
    if (isAsyncTest) {
      m.constant('done', done);
    }
    m.run(cb);
    angular.bootstrap(document, ['test-module']);
    if (!isAsyncTest) {
      done();
    }
  });
}

module.exports = {
  ngIt: ngIt
};
