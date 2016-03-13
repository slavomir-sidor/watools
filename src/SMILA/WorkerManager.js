/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var exec = require('child_process').exec;

WorkerManager = function()
{
	this.jobs = new Array();
	this.workers = new Array();
};

WorkerManager.prototype.run = function(job, urlId)
{
	exec('node ./failing.js', function(error, stdout, stderr)
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