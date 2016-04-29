/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var process = require('child_process');
var spawn = require('child_process').spawn;
var stringify = require('node-stringify');

/**
 * cmd : this.command, args : this.args, restarts - Integer - (opt) After death,
 * how many times to restart -1: forever 0: no restarts x: restart x-times
 * restartDelay - Decimal - (opt) Delay between restarts onStdout - Function -
 * (opt) callback for child.stdout onSterr - Function - (opt) callback for
 * child.stderr
 */
Phantom = function(job, args)
{
	/**
	 * -1: forever 0: no restarts x: restart x-times
	 */
	this.command = 'node_modules/.bin/phantomjs';

	/**
	 * -1: forever 0: no restarts x: restart x-times
	 */
	this.restarts = 0;

	/**
	 * restartDelay - Decimal - (opt) Delay between restarts
	 */
	this.restartDelay;

	/**
	 * 
	 */
	var spawnArgs = new Array();

	/**
	 * 
	 */
	spawnArgs.push('src/SMILA/Job/' + job + '.js');

	for ( var name in args)
	{
		spawnArgs.push(args[name]);
	}

	/**
	 * 
	 */
	this.args = spawnArgs;
};

/**
 * Run Job
 */
Phantom.prototype.runJob = function(startCallback, finishCallback)
{
	console.log('Runnig process: ' + this.command);
	console.log('Runnig process args: ' + stringify(this.args));

	/**
	 * Spawn
	 */
	this.spawn = spawn(this.command, this.args);

	/**
	 * Start Callback
	 */
	startCallback();

	/**
	 * 
	 */
	this.spawn.stdout.on('data', function(data)
	{
		console.log('' + data);
	});

	this.spawn.stderr.on('data', function(data)
	{
		console.log('' + data);
	});

	this.spawn.on('close', function(code, signal)
	{
		console.log('child process terminated with code ' + code);
		finishCallback();
	});

	this.spawn.on('message', function(msg)
	{
		console.log('Message ' + msg);
	});
};

/**
 * Module exports.
 */
module.exports = Phantom;