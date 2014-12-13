/*jslint node: true */

'use strict';


module.exports = function (config) {

    config.set({

        // Enable or disable watching files and executing the tests whenever one of these files changes
        autoWatch: true,

        // Base path, used to resolve all relatives paths defined in 'files' and 'exclude'
        basePath: '../',

        // List of files/patterns to load in the browser
        files: [
            'test/lib/bower_components/angular/angular.js',
            'test/lib/bower_components/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Testing framework to use (typically, you will set this to jasmine, mocha, qunit)
        frameworks: ['jasmine'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        // Reporters
        reporters: ['progress', 'coverage'],

        // Configure the reporter
        coverageReporter: {
            type : 'lcov',
            dir : 'coverage/'
        },

        // Preprocessors
        preprocessors: {
            'src/*.js': ['coverage']
        },

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ]

    });
};
