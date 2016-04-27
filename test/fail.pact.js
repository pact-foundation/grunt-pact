'use strict';

module.exports = function (server) {
	console.log('failing file');
	unknown.someProp = true; // this should error
};
