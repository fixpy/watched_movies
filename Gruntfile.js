'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var dist = 'public',
    cssmin = {};

  cssmin[dist + '/styles/app.css'] = ['styles/app.css'];

  grunt.initConfig({
    wiredep: {
      client: {
        directory: 'client/bower_components',
        bowerJson: require('./client/bower.json'),
        src: ['client/index.html'],
        ignorePath: /\.\.\//
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'client/',
          dest: dist,
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'views/{,*/}*.html'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: 'styles',
        dest: dist + '/styles/',
        src: '{,*/}*.css'
      }
    },

    useminPrepare: {
      html: 'client/index.html',
      options: {
        dest: dist,
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
          dist + '/scripts/{,*/}*.js',
          dist + '/styles/{,*/}*.css'
        ]
      }
    },

    usemin: {
      html: [dist + '/{,*/}*.html'],
      css: [dist + '/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          dist,
          dist + '/styles'
        ]
      }
    },

    cssmin: {
      dist: {
        files: [cssmin]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles/svg',
          src: '{,*/}*.svg',
          dest: dist + '/styles/svg'
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
          cwd: dist,
          src: ['*.html', 'views/{,*/}*.html'],
          dest: dist
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
            dist + '/{,*/}*',
            '!' + dist + '/.git{,*/}*'
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