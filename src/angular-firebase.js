/**
 * googleplus module
 */
angular.module('firebase', []).

/**
 * Firebase provider
 */
provider('Firebase', [function () {

  /**
   * Options object available for module
   * options/services definition.
   * @type {Object}
   */
  var options = {};
  var messaging;

  /**
   * apiKey
   * @type {String}
   */
  options.apiKey = null;

  this.setApiKey = function (apiKey) {
    options.apiKey = apiKey;
    return this;
  };

  this.getApiKey = function () {
    return options.apiKey;
  };

  /**
   * authDomain
   * @type {String}
   */
  options.authDomain = null;

  this.setAuthDomain = function (authDomain) {
    options.authDomain = apiKey;
    return this;
  };

  this.getAuthDomain = function () {
    return options.authDomain;
  };

  /**
   * databaseURL
   * @type {String}
   */
  options.databaseURL = null;

  this.setDatabaseURL = function (databaseURL) {
    options.databaseURL = apiKey;
    return this;
  };

  this.getDatabaseURL = function () {
    return options.databaseURL;
  };

  /**
   * projectId
   * @type {String}
   */
  options.projectId = null;

  this.setProjectId = function (projectId) {
    options.projectId = apiKey;
    return this;
  };

  this.getProjectId = function () {
    return options.projectId;
  };

  /**
   * storageBucket
   * @type {String}
   */
  options.storageBucket = null;

  this.setStorageBucket = function (storageBucket) {
    options.storageBucket = apiKey;
    return this;
  };

  this.getStorageBucket = function () {
    return options.storageBucket;
  };

  /**
   * messagingSenderId
   * @type {String}
   */
  options.messagingSenderId = null;

  this.setMessagingSenderId = function (messagingSenderId) {
    options.messagingSenderId = apiKey;
    return this;
  };

  this.getMessagingSenderId = function () {
    return options.messagingSenderId;
  };


  /**
   * Init Firebase API
   */
  this.init = function (customOptions) {
    angular.extend(options, customOptions);
  };


  /**
   * This defines the Firebase Service on run.
   */
  this.$get = ['$q', '$rootScope', '$timeout', function ($q, $rootScope, $timeout) {

    /**
     * Define a deferred instance that will implement asynchronous calls
     * @type {Object}
     */
    var deferred;

    /**
     * NgFirebase Class
     * @type {Class}
     */
    var NgFirebase = function () {
    };

    NgFirebase.prototype.requestPermission = function () {
      deferred = $q.defer();
      firebase.initializeApp(options);
      messaging = firebase.messaging();

      messaging.requestPermission()
        .then(function () {
          deferred.resolve();
          $rootScope.$apply();

        }).catch(function (err) {
        deferred.reject(err);
      });


      return deferred.promise;
    };

    NgFirebase.prototype.getToken = function () {
      var deferred = $q.defer();

      messaging.getToken()
        .then(function (currentToken) {
          if (currentToken) {
            deferred.resolve(currentToken);
            $rootScope.$apply();
          } else {
            deferred.reject('No Instance ID token available. Request permission to generate one.');
          }
        })
        .catch(function (err) {
          deferred.reject('An error occurred while retrieving token. ' + err);
        });

      return deferred.promise;
    };
    NgFirebase.prototype.getMessaging = function () {
      return messaging;
    };
    NgFirebase.prototype.deleteToken = function () {
      var deferred = $q.defer();

      messaging.getToken()
        .then(function (currentToken) {
          messaging.deleteToken(currentToken)
            .then(function () {
              deferred.resolve();
            })
            .catch(function (err) {
              deferred.reject('Unable to delete token. ' + err);
            });
        })
        .catch(function (err) {
          deferred.reject('An error occurred while retrieving token. ' + err);
        });

      return deferred.promise;
    };


    return new NgFirebase();
  }];
}])

// Initialization of module
  .run([function () {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://www.gstatic.com/firebasejs/4.6.2/firebase.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  }]);
