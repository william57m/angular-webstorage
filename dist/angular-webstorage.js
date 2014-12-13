/*jslint node: true */
/*global angular, document*/

'use strict';

var angularWebStorage = angular.module('WebStorageModule', []);

angularWebStorage.provider('webStorageService', function () {

    this.$get = ['$window', '$document', function ($window, $document) {
        var webStorage;

        // If angular $document is not available
        $document = !$document ? document : ($document[0] ? $document[0] : $document);


        /*
         * Check if browser support web storage
         */
        var isBrowserSupport = function () {
            var supported = ($window.hasOwnProperty('localStorage') && $window.localStorage !== null);
            return supported;
        };


        /*
         * Add value to storage
         * - key: key to retrieve data
         * - value: value of data
         * - keep: *optional* boolean to keep value indefinitly (localStorage) or temporarily (sessionStorage)
         */
        var addToStorage = function (key, value, keep) {

            // Get storage type
            keep = (typeof keep === 'undefined' || typeof keep !== 'boolean') ? false : keep;
            var storageType = keep ? 'localStorage' : 'sessionStorage';

            // Convert undefined values to null
            if (angular.isUndefined(value)) {
                value = null;
            } else if (angular.isObject(value) || angular.isArray(value)) {
                value = angular.toJson(value);
            }

            // Set web storage
            webStorage = $window[storageType];

            // Add data to storage
            webStorage.setItem(key, value);

            return true;
        };


        /*
         * Return a value from storage
         * - key
         * - storageType: *optional* localStorage or sessionStorage
         */
        var getFromStorage = function (key, storageType) {

            // Get storage type
            var isStorageType = typeof storageType === 'undefined' ? false : true,
                item;

            // Set web storage
            if (isStorageType) {
                webStorage = $window[storageType];
                item = webStorage ? webStorage.getItem(key) : null;
            } else {
                webStorage = $window.sessionStorage;
                item = webStorage ? webStorage.getItem(key) : null;
                if (!item || item === 'null') {
                    webStorage = $window.localStorage;
                    item = webStorage ? webStorage.getItem(key) : null;
                }
            }

            if (!item || item === 'null') {
                return null;
            }

            if (item.charAt(0) === "{" || item.charAt(0) === "[") {
                return angular.fromJson(item);
            }

            return item;
        };


        /*
         * Remove an item from local storage
         * - key: key to retrieve data
         * - storageType: *optional* localStorage or sessionStorage
         */
        var removeFromStorage = function (key, storageType) {

            var isStorageType = typeof storageType === 'undefined' ? false : true;

            if (isStorageType) {
                webStorage = $window[storageType];
                webStorage.removeItem(key);
            } else {
                webStorage = $window.sessionStorage;
                webStorage.removeItem(key);
                webStorage = $window.localStorage;
                webStorage.removeItem(key);
            }

            return true;
        };


        /*
         * Return array of keys from storage
         * - storageType: *optional* localStorage or sessionStorage
         */
        var getKeysFromStorage = function (storageType) {

            var isStorageType = typeof storageType === 'undefined' ? false : true;

            var key,
                keys = [];

            if (isStorageType) {
                webStorage = $window[storageType];
                for (key in webStorage) {
                    keys.push(key);
                }
            } else {
                webStorage = $window.localStorage;
                for (key in webStorage) {
                    keys.push(key);
                }
                webStorage = $window.sessionStorage;
                for (key in webStorage) {
                    if (keys.indexOf(key) == -1) keys.push(key);
                }
            }

            return keys;
        };


        /*
         * Remove all datas from storage
         * - storageType: localStorage or sessionStorage
         */
        var clearAllFromStorage = function (storageType) {
            var isStorageType = typeof storageType === 'undefined' ? false : true,
                key;

            if (isStorageType) {
                webStorage = $window[storageType];
                for (key in webStorage) removeFromStorage(key, storageType);
            } else {
                webStorage = $window.sessionStorage;
                for (key in webStorage) removeFromStorage(key, 'sessionStorage');
                webStorage = $window.localStorage;
                for (key in webStorage) removeFromStorage(key, 'localStorage');
            }
            return true;
        };


        return {
            isSupported: isBrowserSupport,
            set: addToStorage,
            get: getFromStorage,
            keys: getKeysFromStorage,
            remove: removeFromStorage,
            clearAll: clearAllFromStorage
        };
    }];
});
