'use strict';

// Nombre de los eventos
export default function idbEvents() {
  return {
    DB_ERROR: 'cb.error',
    MODEL_INSTANCED : 'model.instanced',
    MODEL_REPLACE : 'model.replace',
    MODEL_QUERIED : 'model.queried',
    MODEL_UNQUERIED : 'model.unqueried',
  }
};