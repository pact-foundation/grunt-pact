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
				src: 'pacts/test.pact.js'
			},
			failingPactFile: {
				options: {
					port: 9000,
					host: 'localhost'
				},
				src: 'pacts/fail.pact.js'
			},
			failingPactFileForced: {
				options: {
					force: true,
					port: 9000,
					host: 'localhost'
				},
				src: 'pacts/fail.pact.js'
			}
		},
		
		// Unit tests.
		nodeunit: {
			tests: ['**/*.spec.js', '!node_modules/**/*']
		},

		wait: {
			all: {
				options: {
					delay: 3 * 1000
				}
			}
		}
	});
	
	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');
	
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-wait');
	
	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['nodeunit']);
	
	// By default, lint and run all tests.
	grunt.registerTask('default', ['test']);
	
};
