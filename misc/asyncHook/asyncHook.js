/*
Async Hooks Example
*/

//Dependencies
var async_hooks = require("async_hooks");
var fs = require("fs");

//Target execution context
var whatTimeIsIt = function (callback) {
  setInterval(function () {
    fs.writeSync(
      1,
      "When the setInterval runs, the execution context is " +
        async_hooks.executionAsyncId() +
        "\n"
    );
    callback(Date.now());
  }, 1000);
};

//Call that function
whatTimeIsIt(function (time) {
  fs.writeSync(1, "The time is " + time + "\n");
});

//Hooks
var hooks = {
  init(asynId, type, triggerAsyncId, resource) {
    fs.writeSync(1, "Hook init " + asyncId + "\n");
  },

  before(asyncId) {
    fs.writeSync(1, "Hook before " + asyncId + "\n");
  },

  after(asyncId) {
    fs.writeSync(1, "Hooke after " + asyncId + "\n");
  },

  destroy(asyncId) {
    fs.writeSync(1, "Hook destroy " + asyncId + "\n");
  },

  promiseResolve(asyncId) {
    fs.writeSync(1, "Hook promiseResolve " + asyncId + "\n");
  },
};

//Create a new AsyncHooks instace
var asyncHook = async_hooks.createHook(hooks);
asyncHook.enable();
