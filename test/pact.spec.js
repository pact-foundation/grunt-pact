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

var isWindows = process.platform === 'win32';

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

var opts, cmd, file, args;

exports.pact = {
	setUp: function (done) {
		opts = {
			cwd: path.resolve(__dirname, '..'),
			detached: !isWindows,
			stdio: 'pipe',
			encoding: 'utf-8'
		};
		cmd = path.resolve('./node_modules/.bin/grunt');

		if (isWindows) {
			file = 'cmd.exe';
			args = ['/s', '/c'];
			opts.windowsVerbatimArguments = true;
		} else {
			file = '/bin/sh';
			args = ['-c'];
		}
		done();
	},
	default: function (test) {
		test.expect(1);
		var p = cp.spawnSync(file, args.concat(cmd + ' pact:default'), opts);
		console.log(p.stdout);
		console.log(p.stderr);
		test.equal(p.status, 0);
		test.done();
	},
	withOptions: function (test) {
		test.expect(2);
		var p = cp.spawn(file, args.concat(cmd + ' pact:withOptions wait'), opts);

		p.stdout.setEncoding('utf8');
		p.stdout.on('data', console.log);
		p.stderr.setEncoding('utf8');
		p.stderr.on('data', console.log);
		p.on('error', console.error);

		onReady().then(function () {
			test.ok(true);
		});

		p.on('close', function (code) {
			test.equal(code, 0);
			test.done();
		});
	},
	failingPactFile: function (test) {
		test.expect(1);
		var p = cp.spawnSync(file, args.concat(cmd + ' pact:failingPactFile'), opts);
		console.log(p.stdout);
		console.log(p.stderr);
		test.notEqual(p.status, 0);
		test.done();
	},
	failingPactFileForced: function (test) {
		test.expect(2);
		var p = cp.spawn(file, args.concat(cmd + ' pact:failingPactFileForced wait'), opts);

		p.stdout.setEncoding('utf8');
		p.stdout.on('data', console.log);
		p.stderr.setEncoding('utf8');
		p.stderr.on('data', console.log);
		p.on('error', console.error);

		onReady().then(function () {
			test.ok(true);
		});

		p.on('close', function (code) {
			test.equal(code, 0);
			test.done();
		});
	}
};
