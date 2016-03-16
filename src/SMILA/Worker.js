/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var process = require('child_process');
var exec = process.exec;
var stringify = require('node-stringify');

Worker = function(command)
{

	this.command = command;

	
};

/**
 * Module exports.
 */
module.exports = Worker;