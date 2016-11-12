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
  // Propiedades
  .property('$_listeners', { value: [] })
  
  // ---------------------------------------------------------------------------
  // method
  .method('$bind', function (type, callback) {
    if(!(type in this.$_listeners)) {
      this.$_listeners[type] = [];
    }
    this.$_listeners[type].push(callback);
    return this;
  })
  
  // ---------------------------------------------------------------------------
  // method
  .method('$unbind ', function (type, callback) {
    if(type in this.$_listeners) {
      var stack = this.$_listeners[type];
      for(var i = 0, l = stack.length; i < l; i++) {
        if(stack[i] === callback){
          stack.splice(i, 1);
          return this.$unbind(type, callback);
        }
      }
    }
    return this;
  })
  
  // ---------------------------------------------------------------------------
  // method
  .method('$emit', function (event) {
    if(event.type in this.$_listeners) {
      var stack = this.$_listeners[event.type];
      for(var i = 0, l = stack.length; i < l; i++) {
          stack[i].call(this, event);
      }
    }
    return this;
  })

  // ---------------------------------------------------------------------------
  .clazz;

}