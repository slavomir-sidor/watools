/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Worker = mongoose.model('Worker',
{
	Name :
	{
		type : String
	}

});

/**
 * Module exports.
 */
module.exports = Worker;