'use strict';

/**
 * Clazzer
 * -----------------------------------------------------------------------------
 * 
 */
export default function () { 'ngInject';

  // ---------------------------------------------------------------------------
  // Constructor
  function Clazzer (constructor) {
    Object.defineProperty(this, 'clazz', { value: constructor || function () {} });
  }

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'inherit', {
    value: function (parent) {
      let tmp = function() {};
      tmp.prototype = parent.prototype;
      this.clazz.prototype = new tmp();
      this.clazz.prototype.constructor = this.clazz;
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'static', {
    value: function (name, value) {
      Object.defineProperty(this.clazz, name, {
        value: value
      });
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'property', {
    value: function (name, opts) {
      Object.defineProperty(this.clazz.prototype, name, opts);
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'method', {
    value: function (name, func) {
      this.property(name, {
        value: func
      });
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'getter', {
    value: function (from, to) {
      if (!to) to = from;
      this.property(from, {
        get: function () {
          return this.$me[to];
        }
      });
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'setter', {
    value: function (from, to) {
      if (!to) to = from;
      this.property(from, {
        set: function (value) {
          this.$me[to] = value;
        }
      });
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  Object.defineProperty(Clazzer.prototype, 'handlerEvent', {
    value: function (from, to) {
      if (!to) to = from;
      this.property(from, {
        value: function (cb) {
          this.$me[to] = cb;
          return this;
        }
      });
      return this;
    }
  });

  // ---------------------------------------------------------------------------
  return Clazzer;

}