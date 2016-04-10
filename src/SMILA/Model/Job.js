/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Job = mongoose.model('Job',
{
	Name : { type: String }
});


/**
 * Module exports.
 */
module.exports = Job;