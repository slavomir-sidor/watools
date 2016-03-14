/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var requireDir = require('require-dir');
var exec = require('child_process').exec;
var process = require('process');
var util = require('util');
var jobs = requireDir('./Job/');
var pipelines = requireDir('./Pipeline/');

WorkerManager = function(smila)
{
	this.smila = smila;

	console.log('Initializing Worker Manager, on' + this.smila.maxThreads + ' max threads . ');

	this.jobs = new Array();

	console.log('Importing Jobs ... ');

	for (jobName in jobs)
	{
		var job = new jobs[jobName];

		console.log('Importing Job: ' + jobName);

		this.jobs[jobName] = job;
	}

	this.workers = new Array();
};

WorkerManager.prototype.run = function(job, url)
{
	var workerCommand = 'node ' + __dirname + '/Worker.js ' + job + ' ' + url;

	console.log(workerCommand);
	// workerCommand="ls -all";

	exec(workerCommand, function(error, stdout, stderr)
	{

		console.log('stdout: ', stdout);
		console.log('stderr: ', stderr);

		if (error !== null)
		{
			console.log('exec error: ', error);
		}

	});
};

/**
 * Module exports.
 */
module.exports = WorkerManager;