// grunt build
// grunt karma:unit:start watch
// grunt karma:once


module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/*.js'],
                dest: "dist/shoppingCart.js"
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> */\n <%= pkg.url %>'
            },
            dist: {
                src: 'dist/*.js',
                dest: "dist/shoppingCart.min.js"
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true,
                browsers: ['PhantomJS2']
            },
            once: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        watch: {
            karma: {
                files: ['src/**/*.js'],
                tasks: ['karma:unit:run']
            }
        }

    });


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');


    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('devmode', ['karma:unit', 'watch']);
    grunt.registerTask('testunit', ['karma:unit']);


    grunt.registerTask('default', ['test', 'build']);


};
