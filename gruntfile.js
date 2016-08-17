module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            basePath   : './',
            srcPath    : './dev/scss/',
            targetPath : './dev/css/'
        },
        sass : {
            dist : {
                files : {
                    '<%= meta.targetPath %>layout.css' : '<%= meta.srcPath %>layout.scss'
                }
            }
        },
        watch : {
            scripts : {
                files : [
                    '<%= meta.srcPath %>/**/*.scss'
                ],
                tasks : ['sass']
            }
        }
    });

    // Necessary grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('default', ['sass']);
};

