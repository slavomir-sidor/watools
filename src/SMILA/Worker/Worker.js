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
	/**
	 * Command
	 */
	this.command = command;

	/**
	 * Args
	 */
	this.args = args;

	/**
	 * Restart
	 * 
	 * -1: forever 0: no restarts x: restart x-times
	 */
	this.restarts = 0;

	/**
	 * Restart Delay
	 * 
	 * restartDelay - Decimal - (opt) Delay between restarts
	 */
	this.restartDelay;
};

Worker.prototype.start = function()
{
	console.log('Runnig process: ' + this.command);
	console.log('Runnig process args: ' + stringify(this.args));

	this.spawn.start();
};

/**
 * On Stdout
 * 
 * @param data
 */
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