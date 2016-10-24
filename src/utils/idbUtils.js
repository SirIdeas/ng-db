'use strict';

export default function idbUtils ($q) { 'ngInject'
  
  const validators = {
    // Funcion para determinar si es un callback válido o no
    callback: function (value) {
      return typeof value == 'function' || value == null || value == undefined;
    },

    // Verifica si un valor es un array
    array: function (value) {
      return Array.isArray(value);
    }
    
  }  

  // Genera un error si el valor no es del tipo indicado por parametro
  function valid (value, types) {
    if (!validators.array(types)) types = [types];

    for(let i in types){
      const type = types[i];
      if (typeof type == 'string'){
        if (typeof validators[type] == 'function') {
          if (validators[type](value)) {
            return true;
          }
        } else if (typeof value == type) {
          return true;
        }
      } else if (typeof type == 'function'){
        if(type(args[i])){
          return true;
        }
      }
    }

    return false;

  }

  // Valida un array de argumentos con un arra de tipos
  function validate (args, types) {

    args = Array.prototype.slice.call(args);
    if (typeof types == 'string') types = [types];
    for (let i in args){
      const value = args[i];
      const type = types[i];
      if (type && !valid(value, type)){
        let err = new Error('Invalid validator to: '+args[i]+' must be '+type);
        err.name = 'InvalidValidator'
        throw err;
      }
    }

  }

  return {
    validate: validate,
  };

}