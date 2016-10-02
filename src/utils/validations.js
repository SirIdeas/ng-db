'use strict';

// Funcion para determinar si es un callback válido o no
export function isCallback (cb, throwError) {

  if (typeof cb == 'function' || cb == null || cb == undefined){
    return true;
  }

  return false;

}

// Si el callback no es válido lanza un errpor
export function mustBeCallback (cb) {
  if (isCallback(cb)) return;

  var err = new Error('Invalid callback');
  err.name = 'InvalidCallback'

  throw err;

}

// Genera un error si el valor no es del tipo indicado por parametro
export function mustBe (value, types) {
  if (typeof types == 'string') types = [types];
  for(var i in types){
    if (typeof value == types[i]) continue;
    var err = new Error('Invalid value: '+value+' must be '+types[i]);
    err.name = 'InvalidValue'
    throw err;
  }

}

// Valida un array de argumentos con un arra de tipos
export function validate (args, types) {
  args = Array.prototype.slice.call(args);
  if (typeof types == 'string') types = [types];
  for (var i in args){
    if (types[i]){
      if (typeof types[i] == 'string' || typeof types[i] == 'object'){
        mustBe(args[i], types[i]);
        continue;
      }
      if (typeof types[i] == 'funcion'){
        types[i](args[i]);
        continue;
      }

      var err = new Error('Invalid validator to: '+values[i]+' must be '+types[i]);
      err.name = 'InvalidValidator'
      throw err;

    }
  }
}