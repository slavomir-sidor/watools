/**
 * 
 */

var mongoose = require('mongoose');
var requireDir = require('require-dir');
var Models = requireDir('./Model/');

BlackBoard = function(name)
{
	this.name = name;
	this.mongoose = mongoose;
	this.mongoose.connect('mongodb://localhost/' + name);
	this.models = Models;
};

BlackBoard.prototype.getRecord = function(id)
{

};

BlackBoard.prototype.getRecordMetadata = function(id)
{

};

/**
 * Module exports.
 */
module.exports = BlackBoard;
