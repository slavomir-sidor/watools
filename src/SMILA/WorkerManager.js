/**
 * Semantic Information Logistic Architecture
 * 
 * 
 * 
 * @author Slavomir
 */
/**
 * Crawlers: concepts and basic implementations for scalable components that
 * extract data from data sources.
 * 
 * Crawler - A crawler is a special worker in an asynchronous workflow that
 * imports data from a data source (e.g. filesystem, web or database) into
 * SMILA.
 * 
 * It iterates over the data elements and creates records for all elements that
 * will be further processed in the workflow. In general crawlers resp. crawl
 * workflows are used for initial (bulk) import of data sources. (see SMILA
 * Importing for more details)
 */

var requireDir = require('require-dir');

var fs = require('fs');
var util = require('util');
var stringify = require('node-stringify');
var workers = requireDir('./Worker');

WorkerManager = function(smila)
{
	console.log('Initializing SMILA Worker Manager:');

	this.smila = smila;

	this.maxThreads = 10;

	/**
	 * Stack
	 */
	this.tasks = new Array();

	this.jobs = fs.readdirSync(__dirname + '/Job', function(error, files)
	{
		return files;
	});

	this.workers = workers;

	this.processes = new Array();
};

WorkerManager.prototype.runWorker = function(name, job, input)
{
	var worker = new this.workers[name](job, input);
	this.tasks.push(worker);
	this.runProcess();

	return worker;
}

WorkerManager.prototype.runProcess = function()
{
	if (this.maxThreads != -1 && this.processes.length > this.maxThreads)
	{
		return;
	}

	if (this.tasks.length > 0)
	{
		var self = this;

		while (this.processes.length < this.maxThreads && this.tasks.length > 0)
		{
			var process = this.tasks.shift();
			var index = this.processes.push(process);

			process.runJob(function()
			{
				self.onProcessFinish(index);
			});
		}
	}
}

/**
 * Gets currently running processes.
 * 
 * Commands, arguments, pids.
 * 
 * @returns {Array}
 */
WorkerManager.prototype.getProcesses = function()
{
	var results = new Array();

	for (process in this.processes)
	{
		var result =
		{
			command : process.command,
			args : process.args
		};

		results.push(result);
	}

	return results;
}

/**
 * Gets tasks waiting for process count
 * 
 * @returns int
 */
WorkerManager.prototype.getTasksCount = function()
{
	return this.tasks.length;
}

/**
 * Gets tasks waiting for process count
 * 
 * @returns {Array}
 */
WorkerManager.prototype.getTasks = function(limit, offset)
{
	var results = new Array();
	var max = offset + limit;
	var i = offset;
	
	while (i < max && i < this.tasks.length)
	{
		results.push(this.tasks[i]);
		i++;
	}

	return results;
}

WorkerManager.prototype.onProcessFinish = function(index)
{
	this.processes.splice(index, 1);
	this.runProcess();
}

WorkerManager.prototype.getJobs = function()
{
	return this.jobs;
}

/**
 * Module exports.
 */
module.exports = WorkerManager;