/*jslint node: true */
/*global describe, beforeEach, storageMock, inject, it, value, expect*/

'use strict';

describe('webStorageServiceGet', function () {

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
     * Getting test
     */
    it('should be able to get from local storage with localStorage param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo1', 'localStorage')).toEqual('bar1');
        });
    });

    it('should be able to get from local storage without param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo1')).toEqual('bar1');
        });
    });

    it('should be able to get from session storage with sessionStorage param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo3', 'sessionStorage')).toEqual('bar3');
        });
    });

    it('should be able to get from session storage without param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo3')).toEqual('bar3');
        });
    });

    it('should be able to get from session storage without param with double key', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo2')).toEqual('bar2_2');
        });
    });

    it('should not be able to get from local storage with sessionStorage param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo1', 'sessionStorage')).toEqual(null);
        });
    });

    it('should not be able to get from session storage with localStorage param', function () {
        inject(function (webStorageService) {
            expect(webStorageService.get('foo3', 'localStorage')).toEqual(null);
        });
    });

});