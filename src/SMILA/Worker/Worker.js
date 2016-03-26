/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var process = require('child_process');
var exec = process.exec;
var stringify = require('node-stringify');

/**
 * cmd : this.command, args : this.args, restarts - Integer - (opt) After death,
 * how many times to restart -1: forever 0: no restarts x: restart x-times
 * restartDelay - Decimal - (opt) Delay between restarts onStdout - Function -
 * (opt) callback for child.stdout onSterr - Function - (opt) callback for
 * child.stderr
 */
Worker = function(command, args, restarts)
{
	this.command = command;

	this.args = args;

	/**
	 * -1: forever 0: no restarts x: restart x-times
	 */
	this.restarts = 0;

	/**
	 * restartDelay - Decimal - (opt) Delay between restarts
	 */
	this.restartDelay;
};

Worker.prototype.start = function()
{
	this.spawn.start();
};

Worker.prototype.onStdout = function(data)
{
	console.log(data);
};

Worker.prototype.onSterr = function(data)
{
	console.log(data);
};

/**
 * Module exports.
 */
module.exports = Worker;