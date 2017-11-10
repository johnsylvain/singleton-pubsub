;
(function (name, context, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // Global namespace
    context[name] = factory.call(context);
  }
})('SingletonPubsub', this, function () {

  var instance;

  var SingletonPubsub = function () {
    if (typeof instance === 'object') {
      return instance;
    }

    instance = this;

    this.events = {};

    return instance;
  }

  SingletonPubsub.prototype.on = function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);

    return this;
  }

  SingletonPubsub.prototype.off = function (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }

    return this;
  }

  SingletonPubsub.prototype.emit = function (eventName, data, context) {
    context = context || undefined;

    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn.call(context, data);
      });
    }

    return this;
  }

  return SingletonPubsub;

});