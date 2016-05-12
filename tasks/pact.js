'use strict';

var pact = require('@pact-foundation/pact-node'),
	_ = require('underscore'),
	path = require('path');

var targets = {};

module.exports = function (grunt) {

	grunt.registerMultiTask('pact', 'A grunt task to run pact', function (arg) {
		arg = arg || 'start';
		var done = this.async();
		var options = this.options();
		var files = this.files;

		if (!targets[this.target]) {
			targets[this.target] = pact.create(options);
		}

		switch (arg) {
			case 'start':
				targets[this.target].start().then(function (server) {
					grunt.log.ok('Pact started on port ' + server.options.port);

					// Go through each files and call it with the server instance
					_.each(files, function (f) {
						_.each(f.src, function (file) {
							try {
								var func = require(path.resolve(file));
								grunt.verbose.writeln('Including pact file `' + file + '`');
								if (_.isFunction(func)) {
									func(server);
								}
							} catch (e) {
								grunt.log.error('Grunt-pact could not include file `' + file + '` because of error, Skipping over.\n' + e.stack);
							}
						});
					});

					grunt.log.ok('Done including Pact files.');
					done();
				});
				break;
			case 'stop':
				targets[this.target].stop().then(function (server) {
					grunt.log.ok('Pact stopped on port ' + server.options.port);
					done();
				});
				break;
		}
	});

	process.on('exit', function () {
		for (var target in targets) {
			grunt.task.run('pact:' + target + ':stop');
		}
	});
};
