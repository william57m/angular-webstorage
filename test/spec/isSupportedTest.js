/*jslint node: true */
/*global describe, beforeEach, storageMock, inject, it, value, expect*/

'use strict';

describe('webStorageServiceIsSupported', function () {

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
     * isSupported test
     */
    it('isSupported should be true', function () {
        inject(function (webStorageService) {
            expect(webStorageService.isSupported()).toEqual(true);
        });
    });

});

describe('webStorageServiceIsNotSupported', function () {

    /*
     * Setup test
     */
    beforeEach(module('WebStorageModule', function ($provide) {
        $provide.value('$window', {
            localStorage: null,
            sessionStorage: null
        });
    }));

    /*
     * isSupported test
     */
    it('isSupported should be false', function () {
        inject(function (webStorageService) {
            expect(webStorageService.isSupported()).toEqual(false);
        });
    });

});