/*jslint node: true */
/*global describe, beforeEach, storageMock, inject, it, value, expect*/

'use strict';

describe('webStorageServiceClearAll', function () {

    /*
     * Setup test
     */
    beforeEach(
        module('WebStorageModule', function ($provide) {
            $provide.value('$window', {
                localStorage: storageMock(),
                sessionStorage: storageMock()
            });
        })
    );

    beforeEach(
        inject(function ($window) {
            $window.localStorage.setItem('foo1', 'bar1');
            $window.localStorage.setItem('foo2', 'bar2_1');
            $window.sessionStorage.setItem('foo2', 'bar2_2');
            $window.sessionStorage.setItem('foo3', 'bar3');
        })
    );

    /*
     * ClearAll test
     */
    it('should be able to remove all data from local storage with localStorage param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.clearAll('localStorage');
            expect($window.localStorage.length).toEqual(0);
            expect($window.sessionStorage.length).toEqual(2);
        });
    });

    it('should be able to remove all data from session storage with sessionStorage param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.clearAll('sessionStorage');
            expect($window.localStorage.length).toEqual(2);
            expect($window.sessionStorage.length).toEqual(0);
        });
    });

    it('should be able to remove all data from session and local storage without param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.clearAll();
            expect($window.localStorage.length).toEqual(0);
            expect($window.sessionStorage.length).toEqual(0);
        });
    });


});