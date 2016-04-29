/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var TaskInput = mongoose.model('TaskInput',
{
	Task :
	{
		type : Schema.Types.ObjectId,
		ref : 'Task'
	},

	JobInput :
	{
		type : Schema.Types.ObjectId,
		ref : 'JobInput'
	},

	Value :
	{
		type : "string"
	}
});

/**
 * Module exports.
 */
module.exports = TaskInput;