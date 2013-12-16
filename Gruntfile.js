/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  RegExp.quote = require('regexp-quote')
  var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Boilerplate v<%= pkg.version %> by @wcweb\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' *\n' +
              ' * Designed and built with all the love in the world by @wcweb.\n' +
              ' */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("It requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*.js','js/bootstrap/*.js']
      },
      test: {
        src: ['js/tests/unit/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      splite_pages: {
          src: [
            'splite_pages/header.html',
            'splite_pages/pages/part1.html'
          ]
      },
      boilerplate:{
        src: [
          'js/*.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
      ,bootstrap: {
        src: [
          'js/<%= pkg.base %>/transition.js',
          'js/<%= pkg.base %>/alert.js',
          'js/<%= pkg.base %>/button.js',
          'js/<%= pkg.base %>/carousel.js',
          'js/<%= pkg.base %>/collapse.js',
          'js/<%= pkg.base %>/dropdown.js',
          'js/<%= pkg.base %>/modal.js',
          'js/<%= pkg.base %>/tooltip.js',
          'js/<%= pkg.base %>/popover.js',
          'js/<%= pkg.base %>/scrollspy.js',
          'js/<%= pkg.base %>/tab.js',
          'js/<%= pkg.base %>/affix.js'
        ],
        dest: 'dist/js/<%= pkg.base %>.js'
      }
    },
        
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      boilerplate:{
        src: ['<%= concat.boilerplate.dest %>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/<%= pkg.base %>.min.js'
      }
    },

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      }
      // ,bootstrap: {
      //   src: ['less/<%= pkg.base %>/bootstrap.less'],
      //   dest: 'dist/css/<%= pkg.base %>.css'
      // }
      // ,min: {
      //   options: {
      //     compress: true
      //   },
      //   src: ['less/<%= pkg.base %>/bootstrap.less'],
      //   dest: 'dist/css/<%= pkg.base %>.min.css'
      // }
      // ,theme: {
      //   src: ['less/<%= pkg.base %>/theme.less'],
      //   dest: 'dist/css/<%= pkg.base %>-theme.css'
      // }
      // ,theme_min: {
      //   options: {
      //     compress: true
      //   },
      //   src: ['less/<%= pkg.base %>/theme.less'],
      //   dest: 'dist/css/<%= pkg.base %>-theme.min.css'
      // }
      ,boilerplate: {
        src:['less/boilerplate.less'],
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      boilerplate_min: {
         options: {
          compress: true
        },
        src: ['less/boilerplate.less'],
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: ["fonts/*"],
        dest: 'dist/'
      },
      dist_jekyll:{
        expand:true,
        src: ["dist/css/*"],
        dest: '_dest_pages/'
      },
      js_libs: {
        expand: true,
        src: ["js/libs/jquery.ad.js"],
        dest: "_dest_pages/js/"
      },
      assets: {
        expand:true,
        src: ["docs-assets/img/*"],
        dest: "_dest_pages/dist/css/img/"
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: ['js/tests/*.html']
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      docs: {}
    },

    validation: {
      options: {
        reset: true,
        relaxerror: [
            "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
            "Element img is missing required attribute src."
        ]
      },
      files: {
        src: ["_dest_pages/**/*.html"]
      }
    },

    watch: {
      src: {
        files: ['<%= jshint.src.src %>','<%= copy.js_libs.src %>'],
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      recess: {
        files: 'less/*.less',
        tasks: ['recess','copy:dist_jekyll']
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver')
          return old ? RegExp.quote(old) : old
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-html-build');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Test task.
  var testSubtasks = ['dist-css', 'jshint', 'qunit', 'validate-html'];
  // Only run BrowserStack tests under Travis
  if (process.env.TRAVIS) {
    // Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
    if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
      testSubtasks.push('browserstack_runner');
    }
  }
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist', 'build-customizer']);

  grunt.registerTask('js-libs', ['concat','build-customizer', 'watch'])

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', ['sed']);

  // task for building customizer
  grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function () {
    var fs = require('fs')

    function getFiles(type) {
      var files = {}
      fs.readdirSync(type)
        .filter(function (path) {
          return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
        })
        .forEach(function (path) {
          var fullPath = type + '/' + path
          return files[path] = (type == 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8'))
        })
      return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
    }

    var files = getFiles('js') + getFiles('less') + getFiles('fonts')
    fs.writeFileSync('docs-assets/js/raw-files.js', files)
  });
};
