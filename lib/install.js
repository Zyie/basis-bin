'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const path = require('path');
const bin = require('.');

bin.run(['-version']).then(() => {
	log.success('basis pre-build test passed successfully');
}).catch(error => {
	log.error(error.message);
	log.error('basis failed to build');
	process.exit(1);
});
