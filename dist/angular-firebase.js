/*! angular-firebase - v0.1.3 2017-11-29 */
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
    this.init = function(c) {
        angular.extend(a, c);
        firebase.initializeApp(a);
        b = firebase.messaging();
    };
    /**
   * This defines the Firebase Service on run.
   */
    this.$get = [ "$q", "$rootScope", "$timeout", function(a, c, d) {
        /**
     * Define a deferred instance that will implement asynchronous calls
     * @type {Object}
     */
        var e;
        /**
     * NgFirebase Class
     * @type {Class}
     */
        var f = function() {};
        f.prototype.requestPermission = function() {
            e = a.defer();
            b.requestPermission().then(function() {
                this.handlePermissionResult();
            }).catch(function(a) {
                this.handlePermissionResult(a);
            });
            return e.promise;
        };
        f.prototype.handlePermissionResult = function(a) {
            if (!a) {
                e.resolve();
                c.$apply();
            } else {
                e.reject(a);
            }
        };
        f.prototype.getToken = function() {
            var d = a.defer();
            b.getToken().then(function(a) {
                if (a) {
                    d.resolve(a);
                    c.$apply();
                } else {
                    d.reject("No Instance ID token available. Request permission to generate one.");
                }
            }).catch(function(a) {
                d.reject("An error occurred while retrieving token. " + a);
            });
            return d.promise;
        };
        f.prototype.getMessaging = function() {
            return b;
        };
        f.prototype.deleteToken = function() {
            var c = a.defer();
            b.getToken().then(function(a) {
                b.deleteToken(a).then(function() {
                    c.resolve();
                }).catch(function(a) {
                    c.reject("Unable to delete token. " + a);
                });
            }).catch(function(a) {
                c.reject("An error occurred while retrieving token. " + a);
            });
            return c.promise;
        };
        return new f();
    } ];
} ]).run([ function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://www.gstatic.com/firebasejs/4.6.2/firebase.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
} ]);