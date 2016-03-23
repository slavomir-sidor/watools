/**
 * Semantic Information Logistic Architecture
 * 
 * 
 * 
 * @author Slavomir
 */

var requireDir = require('require-dir');

var fs = require('fs');
var util = require('util');
var stringify = require('node-stringify');

WorkerManager = function(smila)
{
	this.smila = smila;

	console.log('Initializing SMILA Worker Manager:');

	/**
	 * Stack
	 */
	this.tasks = new Array();

	this.jobs = fs.readdirSync(__dirname + '/Job', function(error, files)
	{
		return files;
	});

	this.workers = fs.readdirSync(__dirname + '/Worker', function(error, files)
	{
		return files;
	});

	this.pipelines = fs.readdirSync(__dirname + '/Pipeline', function(error, files)
	{
		return files;
	});
};

WorkerManager.prototype.runWorker = function(name, job, input)
{
	var file=name+'.js';
	
	console.log(name);

	var worker = require('./Worker/'+file)(job, input);

	return worker;
	
	if (this.maxThreads != -1 && this.workers.length > this.maxThreads)
	{
		this.tasks.push(worker);
		return;
	}

	if (this.maxThreads > this.workers.length)
	{

	}
}

WorkerManager.prototype.getJobs = function()
{
	return this.jobs;
}

WorkerManager.prototype.next = function()
{

};

/**
 * Module exports.
 */
module.exports = WorkerManager;