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

	this.processes = {};
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

		console.log('Process count: ' + this.getProcessesCount());

		while (this.getProcessesCount() < this.maxThreads && this.tasks.length > 0)
		{
			var process = this.tasks.shift();

			process.runJob(function()
			{
				self.processes[process.spawn.pid] = process;
			}, function()
			{
				self.onProcessFinish(process.spawn.pid);
			});

			/**
			 * var data={ Command:process.command, Arguments:process.args }
			 * self.smila.blackBoard.saveRecord('Process', {}, , function(error,
			 * doc) {
			 * 
			 * });
			 */
		}
	}
}

WorkerManager.prototype.onProcessFinish = function(pid)
{
	delete this.processes[pid];
	this.runProcess();
}

/**
 * Gets tasks waiting for process count
 * 
 * @returns int
 */
WorkerManager.prototype.getProcessesCount = function()
{
	var count = 0;

	for ( var process in this.processes)
	{
		++count;
	}

	return count;
}

/**
 * Gets currently running processes.
 * 
 * Commands, arguments, pids.
 * 
 * @returns {Array}
 */
WorkerManager.prototype.getProcesses = function(offset, limit)
{
	var results = new Array();

	for ( var pid in this.processes)
	{
		var process = this.processes[pid];
		var memory = 0;
		var cpu = 0;

		var result =
		{
			command : process.command,
			args : process.args,
			pid : pid,
			memory : memory,
			cpu : cpu

		};

		results.push(result);
	}

	return results;
}

/**
 * Gets workers count
 * 
 * @returns int
 */
WorkerManager.prototype.getJobsCount = function()
{
	return this.jobs.length;
}

/**
 * Gets jobs
 * 
 * @returns {Array}
 */
WorkerManager.prototype.getJobs = function(offset, limit)
{
	var results = new Array();
	var max = offset + limit;
	var i = offset;

	while (i < max && i < this.jobs.length)
	{
		results.push(this.jobs[i]);
		i++;
	}

	return results;
}

/**
 * Gets workers count
 * 
 * @returns int
 */
WorkerManager.prototype.getWorkersCount = function()
{
	var workers = new Array();

	for ( var worker in this.workers)
	{
		workers.push(worker);
	}

	return workers.length;
}

/**
 * Gets tasks waiting for process count
 * 
 * @returns {Array}
 */
WorkerManager.prototype.getWorkers = function(offset, limit)
{
	var workers = new Array();

	for ( var worker in this.workers)
	{
		workers.push(worker);
	}

	var results = new Array();
	var max = offset + limit;
	var i = offset;

	while (i < max && i < workers.length)
	{
		results.push(workers[i]);
		i++;
	}

	return results;
}

/**
 * Gets tasks count waiting for process
 * 
 * @returns int
 */
WorkerManager.prototype.deleteTask = function(id)
{
	this.tasks.splice(id, 1);
}

/**
 * Gets tasks count waiting for process
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
WorkerManager.prototype.getTasks = function(offset, limit)
{
	var results = new Array();
	var max = offset + limit;
	var i = offset;

	while (i < max && i < this.tasks.length)
	{
		var task = this.tasks[i];
		task.id = i;
		results.push(task);
		i++;
	}

	return results;
}

WorkerManager.prototype.getJobs = function()
{
	return this.jobs;
}

/**
 * Module exports.
 */
module.exports = WorkerManager;