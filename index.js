/* global it, angular */
function ngIt(name, deps, cb) {
  if (arguments.length !== 3) {
    throw new Error('Expected 3 arguments to ngIt: name, modules to inject, test function');
  }
  if (typeof deps === 'string') {
    deps = [deps];
  }

  it(name, function () {
    var m = angular.module('test-module', deps);
    m.run(cb);
    angular.bootstrap(document, ['test-module']);
  });
}

module.exports = {
  ngIt: ngIt
};
