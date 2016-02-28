var gulp       = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', ['watch']);

gulp.task('build', ['build:html', 'build:js']);

gulp.task('build:js', function() {
	return browserify('js/osv.js')
		.bundle()
		.pipe(source('bundle.js')) // gives streaming vinyl file object
	    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		.pipe(gulp.dest('build'));
});

gulp.task('build:js', function() {
	return browserify('js/GSVPano_o.js')
		.bundle()
		.pipe(source('GSVPano_o.js')) // gives streaming vinyl file object
	    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		.pipe(gulp.dest('build'));
});

gulp.task('build:js', function() {
	return browserify('js/script.js')
		.bundle()
		.pipe(source('script.js')) // gives streaming vinyl file object
	    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		.pipe(gulp.dest('build'));
});

gulp.task('build:html', function() {
	return gulp.src('*.html')
		.pipe(gulp.dest('build'));
});

gulp.task('watch', ['build'], function() {
	gulp.watch('js/*.js', ['build']);
});

//the core bundle for our application
// gulp.task('browserify', function() {
//    return browserify('src/index.js')
//       .bundle()
//       .pipe(source('bundle.js'))
//       .pipe(gulp.dest('app/js'));
// });
