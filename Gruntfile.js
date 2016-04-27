'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		clean: {},

		pact: {
			default: {},
			withOptions: {
				options: {
					port: 9000,
					host: 'localhost',
					/* dir: require('path').resolve(__dirname, '../.tmp' + Math.floor(Math.random() * 1000)),*/
					cors: true,
					log: 'log.txt',
					spec: 1,
					consumer: 'consumerName',
					provider: 'providerName'
				},
				src: 'test/**/*.pact.js'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/**/*.spec.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['pact', 'nodeunit', 'pact::stop']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['test']);

};
