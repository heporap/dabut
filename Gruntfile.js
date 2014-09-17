module.exports = function(grunt) {
"use strict";
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - ver. <%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.production.author %>\n' +
			'* License: MIT */\n',
		uglify: {
			dabut: {
				options: {
					banner: '<%= banner %>'
					},
					files: {
						'dabut.min.js': ['dabut.js']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'dabut.js'],
			options: {
				strict : true,
				unused : true,	// 未使用変数を検出
				//undef : true,	// グローバル変数へのアクセスを禁止
				browser : true,	// ブラウザ用変数
				globals: {
					console: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint', 'uglify:dabut']);
};
