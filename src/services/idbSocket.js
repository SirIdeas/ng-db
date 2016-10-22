'use strict';

export default function idbSocketService($log, io, idbUtils) { 'ngInject'; const thiz = this;
  
  let $defUrlServer = null;

  function idbSocket ($urlServer, $accessTokenId, $currentUserId) { const thiz = this;
    idbUtils.validate(arguments, ['string', ['string', 'number'], ['string', 'number']]);

    const $listeners =  [];
    let $socket = null;
    $urlServer = $urlServer || $defUrlServer;

    // Conectarse al servidor
    thiz.connect = function () {
      
      // Creating connection with server
      $socket = io.connect($urlServer);

      // This part is only for login users for authenticated $socket connection between client and server.
      // If you are not using login page in you website then you should remove rest piece of code..

      $socket.on('connect', function(){
        $log.log('connected');

        $socket.emit('authentication', {
          id: $accessTokenId,
          userId: $currentUserId,
        });
        $socket.on('authenticated', function() {
          // use the $socket as usual
          $log.log('User is authenticated');
        });

      });

    };

    thiz.subscribe = function (options, cb) {
      idbUtils.validate(arguments, ['object', ['function', 'undefined']]);

      var name = options.modelName + '.' + options.eventName;

      if (typeof options.modelId === 'number') {
        name = name + '.' + options.modelId;
      }

      $socket.on(name, cb);
      
      //Push the container..
      $listeners.push(name, cb);

    };

    thiz.pushListener = function (subscriptionName, cb) {
      idbUtils.validate(arguments, ['string', ['function', 'undefined']]);

      $listeners.push(subscriptionName);

    };

    thiz.unsubscribe = function (subscriptionName) {
      $socket.removeAllListeners(subscriptionName);  
      var idx = $listeners.indexOf(subscriptionName);
      if (idx != -1){
        $listeners.splice(idx, 1);
      }
    };

    thiz.connect();

  };

  // Asigna la URL de servidor por defecto
  idbSocket.setUrlServer = function (urlServer) {
    $defUrlServer = urlServer;
  };

  // ASigna las credenciales por defecto
  idbSocket.setCredentials = function (accessTokenId, currentUserId) {
    accessTokenId = $accessTokenId
    currentUserId = $currentUserId;
  };

  return idbSocket;

}