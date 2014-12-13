/*jslint node: true */
/*global describe, beforeEach, storageMock, inject, it, value, expect*/

'use strict';

describe('webStorageServiceAdd', function () {

    /*
     * Setup test
     */
    beforeEach(module('WebStorageModule', function ($provide) {
        $provide.value('$window', {
            localStorage: storageMock(),
            sessionStorage: storageMock()
        });
    }));

    /*
     * Adding test
     */
    it('should be able to add to local storage with params', function () {
        inject(function (webStorageService, $window) {
            webStorageService.set('bar', 'foo', true);
            expect($window.localStorage.getItem('bar')).toEqual('foo');
        });
    });

    it('should be able to add to session storage with params', function () {
        inject(function (webStorageService, $window) {
            webStorageService.set('bar', 'foo', false);
            expect($window.sessionStorage.getItem('bar')).toEqual('foo');
        });
    });

    it('should be able to add to session storage without params', function () {
        inject(function (webStorageService, $window) {
            webStorageService.set('bar', 'foo');
            expect($window.sessionStorage.getItem('bar')).toEqual('foo');
        });
    });

    it('should be able to add to session storage with invalid params', function () {
        inject(function (webStorageService, $window) {
            webStorageService.set('bar', 'foo', 'ahahah');
            expect($window.sessionStorage.getItem('bar')).toEqual('foo');
        });
    });

    it('should not be able to add null value', function () {
        inject(function (webStorageService, $window) {
            webStorageService.set('bar', undefined);
            expect($window.sessionStorage.getItem('bar')).toEqual('');
        });
    });

    it('should not be able to add object value', function () {
        inject(function (webStorageService, $window) {
            var dictionary = {'id': 1, 'firstname': 'Titi', 'lastname': 'Toto'};
            webStorageService.set('titi', dictionary);
            expect(webStorageService.get('titi')).toEqual(dictionary);
        });
    });

});