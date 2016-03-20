/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Url = mongoose.model('Url',
{
	id : String,

	/**
	 * 
	 */
	url : String
});

/**
 * Module exports.
 */
module.exports = Url;
