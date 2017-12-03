/*! angular-firebase - v0.1.3 2017-12-02 */
/**
 * googleplus module
 */
angular.module("firebase", []).provider("Firebase", [ function() {
    /**
   * Options object available for module
   * options/services definition.
   * @type {Object}
   */
    var a = {};
    var b;
    /**
   * apiKey
   * @type {String}
   */
    a.apiKey = null;
    this.setApiKey = function(b) {
        a.apiKey = b;
        return this;
    };
    this.getApiKey = function() {
        return a.apiKey;
    };
    /**
   * authDomain
   * @type {String}
   */
    a.authDomain = null;
    this.setAuthDomain = function(b) {
        a.authDomain = apiKey;
        return this;
    };
    this.getAuthDomain = function() {
        return a.authDomain;
    };
    /**
   * databaseURL
   * @type {String}
   */
    a.databaseURL = null;
    this.setDatabaseURL = function(b) {
        a.databaseURL = apiKey;
        return this;
    };
    this.getDatabaseURL = function() {
        return a.databaseURL;
    };
    /**
   * projectId
   * @type {String}
   */
    a.projectId = null;
    this.setProjectId = function(b) {
        a.projectId = apiKey;
        return this;
    };
    this.getProjectId = function() {
        return a.projectId;
    };
    /**
   * storageBucket
   * @type {String}
   */
    a.storageBucket = null;
    this.setStorageBucket = function(b) {
        a.storageBucket = apiKey;
        return this;
    };
    this.getStorageBucket = function() {
        return a.storageBucket;
    };
    /**
   * messagingSenderId
   * @type {String}
   */
    a.messagingSenderId = null;
    this.setMessagingSenderId = function(b) {
        a.messagingSenderId = apiKey;
        return this;
    };
    this.getMessagingSenderId = function() {
        return a.messagingSenderId;
    };
    /**
   * Init Firebase API
   */
    this.init = function(b) {
        angular.extend(a, b);
    };
    /**
   * This defines the Firebase Service on run.
   */
    this.$get = [ "$q", "$rootScope", "$timeout", function(c, d, e) {
        /**
     * Define a deferred instance that will implement asynchronous calls
     * @type {Object}
     */
        var f;
        /**
     * NgFirebase Class
     * @type {Class}
     */
        var g = function() {};
        g.prototype.requestPermission = function() {
            f = c.defer();
            firebase.initializeApp(a);
            b = firebase.messaging();
            b.requestPermission().then(function() {
                f.resolve();
                d.$apply();
            }).catch(function(a) {
                f.reject(a);
            });
            return f.promise;
        };
        g.prototype.getToken = function() {
            var a = c.defer();
            b.getToken().then(function(b) {
                if (b) {
                    a.resolve(b);
                    d.$apply();
                } else {
                    a.reject("No Instance ID token available. Request permission to generate one.");
                }
            }).catch(function(b) {
                a.reject("An error occurred while retrieving token. " + b);
            });
            return a.promise;
        };
        g.prototype.getMessaging = function() {
            return b;
        };
        g.prototype.deleteToken = function() {
            var a = c.defer();
            b.getToken().then(function(c) {
                b.deleteToken(c).then(function() {
                    a.resolve();
                }).catch(function(b) {
                    a.reject("Unable to delete token. " + b);
                });
            }).catch(function(b) {
                a.reject("An error occurred while retrieving token. " + b);
            });
            return a.promise;
        };
        return new g();
    } ];
} ]).run([ function() {} ]);