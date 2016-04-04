'use strict';

var http = require('http');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.pact = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	default: function (test) {
		test.done();
	},
	withOptions: function (test) {
		test.expect(1);

		var amount = 0;

		function done() {
			amount = 0;
			test.ok(true);
			test.done();
		}

		function check() {
			amount++;

			http.request({
				host: 'localhost',
				port: 9000,
				path: '/',
				method: 'GET',
				headers: {
					'X-Pact-Mock-Service': true,
					'Content-Type': 'application/json'
				}
			}, done).on('error', function () {
				if (amount >= 10) {
					test.done();
				}
				setTimeout(check, 500);
			}).end();
		}

		check();
	}
};
