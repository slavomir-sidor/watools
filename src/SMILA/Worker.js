/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var process = require('process');
var stringify = require('node-stringify');

Worker = function(jobName, url)
{

	this.jobName = jobName;
	this.url = url;

	var job = require('./Job/' + this.jobName + '.js');
	this.job = new job(url);
};

/**
 * Module exports.
 */
module.exports = Worker;

if (process.argv.length > 2)
{
	var jobName = process.argv[2];
	var url = process.argv[3];

	var worker = new Worker(jobName, url);
}