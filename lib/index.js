'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const url = `https://github.com/Zyie/basis-bin/raw/master/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}osx/basisu`, 'darwin')
	.src(`${url}linux/x64/basisu`, 'linux', 'x64')
	.src(`${url}win/x64/basisu.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'basisu.exe' : 'basis');
