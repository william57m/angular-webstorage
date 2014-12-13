/*jslint node: true */
/*global describe, beforeEach, storageMock, inject, it, value, expect*/

'use strict';

describe('webStorageServiceKeys', function () {

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
     * Getting keys test
     */
    it('should be able to get keys from local storage with localStorage param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.keys('localStorage')).toEqual(['foo1', 'foo2']);
        });
    });

    it('should be able to get keys from session storage with sessionStorage param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.keys('sessionStorage')).toEqual(['foo2', 'foo3']);
        });
    });

    it('should be able to get keys from session and local storage without param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.keys()).toEqual(['foo1', 'foo2', 'foo3']);
        });
    });

});