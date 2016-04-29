/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Worker = mongoose.model('Worker',
{
	Task :
	{
		type : Schema.Types.ObjectId,
		ref : 'Task'
	},

	Pid :
	{
		type : String
	}
});

/**
 * Module exports.
 */
module.exports = Worker;