/*jslint node: true */
/*global describe, beforeEach, storageMock, inject, it, value, expect*/

'use strict';

describe('webStorageServiceRemove', function () {

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
     * Removing test
     */
    it('should be able to remove from local storage with localStorage param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.remove('foo1', 'localStorage');
            expect($window.localStorage.getItem('foo1')).toEqual(undefined);
        });
    });

    it('should be able to remove from local storage without param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.remove('foo1');
            expect($window.localStorage.getItem('foo1')).toEqual(undefined);
        });
    });

    it('should be able to remove from session storage with sessionStorage param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.remove('foo3', 'sessionStorage');
            expect($window.sessionStorage.getItem('foo3')).toEqual(undefined);
        });
    });

    it('should be able to remove from session storage without param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.remove('foo3');
            expect($window.sessionStorage.getItem('foo3')).toEqual(undefined);
        });
    });

    it('should be able to remove from session and local storage without param', function () {
        inject(function (webStorageService, $window) {
            webStorageService.remove('foo2');
            expect($window.sessionStorage.getItem('foo2')).toEqual(undefined);
            expect($window.localStorage.getItem('foo2')).toEqual(undefined);
        });
    });

});