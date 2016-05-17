'use strict';

var http = require('http'),
	cp = require('child_process'),
	path = require('path'),
	q = require('q');

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

function onReady() {
	var amount = 0;
	var deferred = q.defer();

	function done() {
		deferred.resolve();
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
				deferred.reject();
			}
			setTimeout(check, 500);
		}).end();
	}

	check();

	return deferred.promise;
}

exports.pact = {
	default: function (test) {
		test.expect(1);
		var result = cp.spawnSync('grunt', ['pact:default'], {cwd: path.resolve(__dirname, '..')});
		test.equal(result.status, 0);
		test.done();
	},
	withOptions: function (test) {
		test.expect(2);
		var process = cp.spawn('grunt', ['pact:withOptions', 'wait'], {cwd: path.resolve(__dirname, '..')});

		onReady().then(function () {
			test.ok(true);
		});

		process.on('close', function (code) {
			test.equal(code, 0);
			test.done();
		});
	},
	failingPactFile: function (test) {
		test.expect(1);
		var result = cp.spawnSync('grunt', ['pact:failingPactFile'], {cwd: path.resolve(__dirname, '..')});
		test.notEqual(result.status, 0);
		test.done();
	},
	failingPactFileForced: function (test) {
		test.expect(2);
		var process = cp.spawn('grunt', ['pact:failingPactFileForced', 'wait'], {cwd: path.resolve(__dirname, '..')});

		onReady().then(function () {
			test.ok(true);
		});

		process.on('close', function (code) {
			test.equal(code, 0);
			test.done();
		});
	}
};
