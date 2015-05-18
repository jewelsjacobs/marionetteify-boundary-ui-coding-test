module.exports = function (grunt) {

    var vendors = 'jquery backbone nvd3 d3 backbone.marionette backbone.localstorage'.split(' ');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            dev: ['dist', 'doc'],
            prod: ['public']
        },

        browserify: {
            // just the app
            app: {
                src: 'src/app.js',
                dest: 'dist/app.js',
                options: {
                    debug: true,
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy'],
                    external: vendors
                }
            },
            // just vendors
            vendors: {
                files: {
                    'dist/vendors.js': []
                },
                options: {
                    'require': vendors
                }
            },
            // bundle all in one
            bundle: {
                src: 'src/app.js',
                dest: 'dist/bundle.js',
                options: {
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy']
                }
            },

            test: {
                files: {
                    'dist/tests.js': [
                        'src/spec/**/*.test.js'
                    ]
                },
                options: {
                    extensions: ['.coffee', '.hbs'],
                    transform: ['coffeeify', 'hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
                }
            }
        },

        mkdir: {
            all: {
                options: {
                    mode: 0777,
                    create: ['dist', 'doc']
                }
            }
        },

        // documentation
        jsdoc : {
            dist : {
                src: ['src/**/*.js', 'README.md'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        },

        copy: {
            prod: {
                files: [
                    {expand: true, src: ['assets/**'], dest: 'public/'},
                    {expand: true, src: ['dist/**'], dest: 'public/'},
                    {expand: true, src: ['index.html'], dest: 'public/'}
                ]
            }
        },

        'gh-pages': {
            options: {
                base: 'doc'
            },
            src: ['**']
        },

        // produce index.html by target
        targethtml: {
            dev: {
                src: 'src/index.html',
                dest: 'index.html'
            },
            prod: {
                src: 'src/index.html',
                dest: 'index.html'
            }
        },

        uglify: {
            bundle: {
                src: 'dist/bundle.js',
                dest: 'dist/bundle.js'
            }
        },

        watch: {
            options: {
                livereload: true,
                spawn: false,
                interrupt: true
            },
            src: {
                files: ['src/**/*', '!src/index.html'],
                tasks: ['browserify:app']
            },
            index: {
                files: ['src/index.html'],
                tasks: ['targethtml:dev']
            },
            assets: {
                files: ['assets/**/*']
            },
            test: {
                files: ['dist/app.js', 'src/spec/**/*.test.js'],
                tasks: ['browserify:test']
            },
            karma: {
                files: ['dist/tests.js'],
                tasks: ['jshint:test', 'karma:watcher:run']
            }
        },

        concurrent: {
            test: {
                tasks: ['watch:karma'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            watcher: {
                background: true,
                singleRun: false
            },
            test: {
                singleRun: true
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'src/spec/**/*.js'],
            dev: ['src/**/*.js'],
            test: ['src/spec/**/*.js']
        },

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    open: true,
                    useAvailablePort: true,
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('builddev', ['clean:dev', 'mkdir:all', 'browserify:app', 'browserify:vendors', 'jshint:dev', 'jsdoc', 'gh-pages', 'targethtml:dev']);
    grunt.registerTask('buildprod', ['browserify:bundle', 'uglify', 'targethtml:prod']);
    grunt.registerTask('deploy', ['clean:prod', 'copy:prod']);
    grunt.registerTask('run',   ['builddev', 'connect', 'watch']);
    grunt.registerTask('tdd', ['karma:watcher:start', 'concurrent:test']);
    grunt.registerTask('test', ['browserify:test', 'karma:test']);
};
