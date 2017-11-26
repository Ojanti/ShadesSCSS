
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/build/css/themes/',
                    src: ['*.scss'],
                    dest: 'assets/src/css/',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: ['last 8 versions', 'ie 9', 'ie 8']
                    }), // add vendor prefixes
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/src/css/',
                    src: '*.css',
                    dest: 'assets/src/css/'
                }]
            }
        },
        cssmin: {
            options: {
                gzip: ['min', 'gzip'],
                compatibility: 'ie9,-properties.zeroUnits',
                // sourceMapInlineSources: true,
                advanced: true,
            },
            core: {
                files: [{
                    expand: true,
                    cwd: 'assets/src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/src/css/',
                    ext: '.min.css'
                }]
            },
            vendor: {
              src:  'assets/build/css/vendor/**/*.css',
              dest: 'assets/src/css/vendor.min.css'
            }
        },

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    // Default task.
    grunt.registerTask('default', ['sass', 'postcss', 'cssmin']);

};