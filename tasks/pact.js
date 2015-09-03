'use strict';

var pact = require('pact-node'),
	grunt = require('grunt');

var targets = {};

module.exports = function (grunt) {

	grunt.registerMultiTask('pact', 'A grunt task to run pact', function (arg) {
		arg = arg || 'start';
		var done = this.async();
		var options = this.options();

		if (!targets[this.target]) {
			targets[this.target] = pact.create(options);
		}

		switch (arg) {
			case 'start':
				targets[this.target].start(function (server) {
					grunt.log.writeln('Pact started on port ' + server.port);
					done();
				});
				break;
			case 'stop':
				targets[this.target].stop(function (server) {
					grunt.log.writeln('Pact stopped on port ' + server.port);
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
