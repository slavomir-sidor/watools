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
	url : String,

	job : String,

	content : String,

	created: { type: Date, default: Date.now },
	
	processed: { type: Date, default: Date.now }

});

/**
 * Module exports.
 */
module.exports = Url;
