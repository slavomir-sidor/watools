/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Process = mongoose.model('Process',
{
	Name :
	{
		type : String
	}
});

/**
 * Module exports.
 */
module.exports = Process;