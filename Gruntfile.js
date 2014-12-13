/*jslint node: true */
/*global module*/

'use strict';

module.exports = function (grunt) {

    // Load the grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Import package
        pkg: grunt.file.readJSON('package.json'),

        // Concat all javascript files
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/angular-webstorage.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        // Minify concated file
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        // Check syntax according to jshint
        jshint: {
            grunt: {
                src: ['Gruntfile.js']
            },
            dev: {
                src: ['src/angular-webstorage.js']
            },
            test: {
                src: ['test/spec/**/*.js']
            }
        },

        // Launch test
        karma: {
            options: {
                autowatch: true,
                configFile: 'test/karma.conf.js'
            },
            unit: {}
        }

    });

    // Default task : dist, check syntax and launch test
    grunt.registerTask('default', ['dist', 'jshint', 'test']);

    // Launch test
    grunt.registerTask('test', ['karma']);

    // Concat and minify file
    grunt.registerTask('dist', ['concat', 'uglify']);
};
