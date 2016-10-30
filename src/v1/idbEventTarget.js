'use strict';

/**
 * idbEventTarget
 * -----------------------------------------------------------------------------
 * 
 */
export default function (Clazzer) { 'ngInject';
  
  return new
  // ---------------------------------------------------------------------------
  // Constructor
  Clazzer(function idbEventTarget () {})
  
  // ---------------------------------------------------------------------------
  // propiedad
  .property('$listeners', {
    value: []
  })
  
  // ---------------------------------------------------------------------------
  // method
  .method('$bind', function (type, callback) {
    if(!(type in this.$listeners)) {
      this.$listeners[type] = [];
    }
    this.$listeners[type].push(callback);
  })
  
  // ---------------------------------------------------------------------------
  // method
  .method('$unbind ', function (type, callback) {
    if(!(type in this.$listeners)) {
      return;
    }
    var stack = this.$listeners[type];
    for(var i = 0, l = stack.length; i < l; i++) {
      if(stack[i] === callback){
        stack.splice(i, 1);
        return this.$unbind(type, callback);
      }
    }
  })
  
  // ---------------------------------------------------------------------------
  // method
  .method('$emit', function (event) {
    if(!(event.type in this.$listeners)) {
      return;
    }
    var stack = this.$listeners[event.type];
    for(var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
    }
  })

  // ---------------------------------------------------------------------------
  .clazz;

}