/**
 * Semantic Information Logistic Architecture
 * 
 * 
 * 
 * @author Slavomir
 */

var requireDir = require('require-dir');
var util = require('util');
var stringify = require('node-stringify');
var pipelines = requireDir('./Pipeline/');
var fs = require('fs');
var childProcess = require('child_process');
var exec = childProcess.exec;
var Worker = require('./Worker.js');

WorkerManager = function(smila)
{
	var self = this;
	self.smila = smila;

	console.log('Initializing SMILA Worker Manager Socket');
	// console.log(stringify(self.smila.io));

	self.smila.io.on('connection', function(socket)
	{
		console.log('connection');
		socket.emit('welcome', {});

		socket.on('WorkerManager.onJobEnd', function(data)
		{

		});

		socket.on('WorkerManager.onJobStart', function(data)
		{

		});

	});

	self.jobsDir = __dirname + '/Job';

	self.jobs = fs.readdir(self.jobsDir, function(error, jobs)
	{
		console.log('Impoted (' + jobs.length + ') SMILA Worker Manager Jobs ');

		return jobs;
	});

	this.tasks = new Array();
	this.workers = new Array();
};

WorkerManager.prototype.run = function(jobName, url)
{
	var command = 'node_modules/.bin/phantomjs ' + __dirname + '/Job/' + jobName + '.js ' + url;

	var worker = exec(
	[
		command
	],
	{
		encoding : 'utf8',
		timeout : 0,
		maxBuffer : 200 * 1024,
		killSignal : 'SIGTERM',
		cwd : null,
		env : null
	}, function(error, out, code)
	{
		if (error instanceof Error)
		{
			console.log(stringify(error));
		}

		console.log(stringify(error));
		console.log(stringify(out));
		console.log(stringify(code));

		// worker.exit(code);
	});

	this.tasks.push(worker);

	console.log('Worker command: ' + command);

	return worker;
};

WorkerManager.prototype.next = function()
{

};

/**
 * Module exports.
 */
module.exports = WorkerManager;