'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    wiredep: {
      client: {
        src: ['client/index.html'],
        ignorePath: /\.\.\//
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'client',
          dest: 'public',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'views/{,*/}*.html'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: 'client/styles',
        dest: 'public/styles/',
        src: '{,*/}*.css'
      }
    },

    useminPrepare: {
      html: 'client/index.html',
      options: {
        dest: 'public',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    filerev: {
      dist: {
        src: [
          'public/scripts/{,*/}*.js',
          'public/styles/{,*/}*.css'
        ]
      }
    },

    usemin: {
      html: ['public/{,*/}*.html'],
      css: ['public/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          'public',
          'public/styles'
        ]
      }
    },

    cssmin: {
      dist: {
        files: [{
          'public/styles/app.css': [
            'client/styles/app.css'
          ]
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'client/styles/svg',
          src: '{,*/}*.svg',
          dest: 'public/styles/svg'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'public',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: 'public'
        }]
      }
    },

    clean: {
      tmp: {
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'public/{,*/}*',
            '!public/.git{,*/}*'
          ]
        }]
      }
    },

    shell: {
      dev: {
        command: 'node server/app'
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'svgmin',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'clean:tmp'
  ]);

  grunt.registerTask('start', [
    'shell:dev'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};