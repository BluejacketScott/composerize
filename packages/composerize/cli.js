#!/usr/bin/env node
/* eslint-disable */

const composerize = require('./dist/composerize');

const command = process.argv[2];
const projectName = process.argv[3];

if (process.stdin.isTTY){
    let output = composerize(command);
    output = projectName ? output.replace('<your project name>', projectName) : output.replace('name: <your project name>\n', '');
	console.log(output);
}
else {
	var existingDockerCompose = '';
	process.stdin.on('data', function(d) {
		existingDockerCompose += d;
	}).on('end', function() {
		let output = composerize(command, existingDockerCompose);
        output = projectName ? output.replace('<your project name>', projectName) : output.replace('name: <your project name>\n', '');
		console.log(output);
	}).setEncoding('utf8');
}
