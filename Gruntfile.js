/**
 * Installation:
 * 1. Install Grunt CLI (`npm install -g grunt-cli`)
 * 1. Install Grunt 0.4.0 and other dependencies (`npm install`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where Gruntfile.js is)
 * To execute automatically after each change, execute `grunt --force default watch`
 * To execute build followed by the test run, execute `grunt test`
 *
 * See http://gruntjs.com/getting-started for more information about Grunt
 */
module.exports = function (grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            inject: {
                single: {
                    files: {
                        'dist/index.html': 'src/index.html'
                    }
                }
            },

            html2js: { // Move all template files to one JS file
                //commonDirectives: {
                //    options: {
                //        module: 'sample.directives.templates',
                //        base: 'src/app/directives/templates',
                //        htmlmin: {
                //            collapseWhitespace: true,
                //            removeComments: true
                //        }
                //    },
                //    dest: 'tmp/commonDirectives.js',
                //    src: [
                //        'src/app/directives/*/*.html'
                //    ]
                //},
                modules: {
                    options: {
                        module: 'angapp.templates',
                        base: 'src/app/modules',
                        htmlmin: {
                            collapseWhitespace: true,
                            removeComments: true
                        }
                    },
                    dest: 'tmp/angappTemplates.js',
                    src: [
                        'src/app/modules/*/templates/*.html'
                    ]
                }
            },

            sass: {
                dist: {
                    files: {
                        'design/css/style.css': 'design/css/style.scss'
                    }
                }
            },

            less: {
                development: {
                    options: {
                        compress: true,
                        yuicompress: true,
                        optimization: 2
                    },
                    files: {
                        "dist/css/angapp.min.css": "src/less/angapp.less",
                        "dist/css/login.min.css": "src/less/login.less"
                    }
                }
            },

            // Copy file from src directory to dist
            copy: {
                index: {
                    files: [
                        {
                            src: 'src/index.html',
                            dest: 'dist/index.html'
                        }
                    ]
                },
                main: {
                    files: [
                        {
                            expand: true,
                            cwd: 'design/fonts/',
                            src: ['**'],
                            dest: 'dist/fonts/'
                        },
                        {
                            expand: true,
                            cwd: 'src/img/',
                            src: ['**'],
                            dest: 'dist/img/'
                        },
                        {
                            expand: true,
                            cwd: 'bower_components/',
                            src: ['**'],
                            dest: 'dist/lib/'
                        },
                        {
                            expand: true,
                            cwd: 'src/plugins/',
                            src: ['**'],
                            dest: 'dist/plugins/'
                        },
                        {
                            expand: true,
                            cwd: 'src/js/',
                            src: ['**'],
                            dest: 'dist/js/'
                        }
                    ]
                }
            },

            common: {
                //directives: [
                //    'src/app/directives/*.js',
                //    'src/app/directives/*/*.js'
                //],
                services: [
                    'src/app/services/*.js'
                ],
                filters: [
                    'src/app/filters/*.js'
                ],
                translations: [
                    'src/app/translations/*.js'
                ]
            },

            app: {
                all: [
                    'src/app/modules/*/*/*.js'
                ]
            },

            configuration: {},

            concat: {
                dist: {
                    files: {
                        'dist/js/app.js': [
                            'tmp/intro.js',
                            'src/app/app.js',
                            '<%= common.translations %>',
                            //'<%= common.directives %>',
                            '<%= common.services %>',
                            '<%= common.filters %>',
                            '<%= app.all %>',
                            //'tmp/commonDirectives.js',
                            'tmp/angappTemplates.js'
                        ]
                    }
                }
            },

            watch: {
                options: {
                    livereload: true
                },
                files: [
                    'src/*.html',
                    'src/less/*.less',
                    'src/less/**/*.less',
                    'src/app/**/*.html',
                    'src/app/*.js',
                    'src/app/*.js',
                    'src/app/**/**/*.js',
                    'src/app/**/**/*.html'
                ],
                tasks: ['build']
            },

            clean: {
                dist: ['tmp']
            },

            connect: {
                dev: {
                    options: {
                        port: 8001,
                        hostname: "0.0.0.0",
                        base: "dist",
                        keepalive: true
                    }
                }
            }
        }
    );

    grunt.registerTask('default', ['html2js', 'concat', 'clean']);
    grunt.registerTask('build', ['default', 'less', 'copy']);
    grunt.registerTask('watch', ['default', 'less', 'copy:index']);
    grunt.registerTask('start', ['copy', 'connect']);

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-config');
    grunt.loadNpmTasks('grunt-inject');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
