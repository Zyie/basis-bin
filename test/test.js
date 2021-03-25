'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const basis = require('..');

test('rebuild the basis binaries', async t => {
	const temporary = tempy.directory();

	await binBuild
		.file(path.resolve(__dirname, '../vendor/source/basis_universal-1.13_3_16.tar.gz'), [
			`cmake CMakeLists.txt`,
			// 'make'
		]);

	t.true(fs.existsSync(path.join(temporary, 'basis')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(basis, ['-version']));
});

test('minify and convert a PNG to Basis', async t => {
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(__dirname, 'fixtures/test.basis');
	const args = [
		src,
	];

	await execa(basis, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});

test('minify and convert a JPG to Basis', async t => {
	const src = path.join(__dirname, 'fixtures/test2.jpg');
	const dest = path.join(__dirname, 'fixtures/test2.basis');
	const args = [
		src,
	];

	await execa(basis, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
