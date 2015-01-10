(function(){
    'use strict';

    var packagejson = require('./package.json');

    module.exports = function(grunt){

        // Configuration
        grunt.initConfig({
            pkg: packagejson,
            concat:{
                dist:{
                    src: [
                        'src/mtng.validator.module.js',
                        'src/services/message.service.js',
                        'src/services/validators.service.js',
                        'src/directives/validator.directive.js'],
                    dest: 'dist/<%= pkg.name %>.js'
                }
            },
            jshint:{
                build:[
                    'dist/<%= pkg.name %>.js'
                ]
            },
            uglify:{
                options:{
                    banner: '/*! <%= pkg.name %> - V<%= pkg.version %> - ' +
                               '<%= grunt.template.today("yyyy-mm-dd") %> - '+
                               '<%= pkg.author %>*/'
                },
                build:{
                    src: 'dist/<%= pkg.name %>.js',
                    dest: 'dist/<%= pkg.name %>.min.js'
                }
            }
        });

        grunt.registerTask('default', [
                'concat',
                //'jshint',
                'uglify'
                ]);

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
    }
})();
