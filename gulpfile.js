/*
* @Author: sison.luo
* @Date:   2016-06-13 11:45:46
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-06-13 13:47:07
*/

'use strict';
var gulp = require('gulp');
var browsersync = require('browser-sync');

gulp.task('bs', function(){
	browsersync({
		files: '**/**',
		server: {
			baseDir: './'
		}
	})
})

gulp.task('default', ['bs']);