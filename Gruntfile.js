module.exports = function(grunt) {

  grunt.initConfig({

    stylus: {
      compile: {
        options: {
          'include css': true,
          'paths': ['css'],
          'compress': true
        },
        files: {
          'css/champignons.css': 'css/champignons.styl'
        }
      }
    },

    watch: {
      css: {
        files: 'css/*.styl',
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};