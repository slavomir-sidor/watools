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
	}
});

/**
 * Module exports.
 */
module.exports = TaskInput;