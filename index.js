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

  var instance = {};

  var SingletonPubsub = function (name, options) {
    name = name || '__default__'
    var reinstantiate = options && options.reinstantiate || false

    if (typeof instance[name] === 'object' && !reinstantiate) {
      return instance[name]
    }
    
    instance[name] = this
    
    this.events = {};

    return instance[name];
  }

  SingletonPubsub.prototype.on = function (name, fn) {
    (this.events[name] || (this.events[name] = [])).push(fn)

    return this;
  }

  SingletonPubsub.prototype.off = function (name, fn) {
    this.events[name].splice(this.events[name].indexOf(fn) >>> 0, 1);

    return this;
  }

  SingletonPubsub.prototype.emit = function (name, data, context) {
    context = context || undefined;

    (this.events[name] || []).map(function(fn) { fn.call(context, data) })

    return this;
  }

  return SingletonPubsub;

});