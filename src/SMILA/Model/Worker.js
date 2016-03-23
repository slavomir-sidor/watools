/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Worker = mongoose.model('Worker',
{
	id : Number,

	Model : String,

	Content : String
});

/**
 * Module exports.
 */
module.exports = Worker;