/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Task = mongoose.model('Task',
{
	id : String,

	Input : String,
	
	Job:String,
	
	Output:String,
	
	Created: { type: Date, default: Date.now },
	
	Processed: { type: Date, default: Date.now }
	
});


/**
 * Module exports.
 */
module.exports = Task;