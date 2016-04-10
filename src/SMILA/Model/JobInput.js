/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var JobInput = mongoose.model('JobInput',
{
	Job :
	{
		type : Schema.Types.ObjectId,
		ref : 'Job'
	}
});

/**
 * Module exports.
 */
module.exports = JobInput;