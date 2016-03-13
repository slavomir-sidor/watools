/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var Record = mongoose.model('Record',
{
	id : String,

	Model : String

});

Record.prototype.getRecord = function(id)
{

};

Record.prototype.getRecordMetadata = function(id)
{

};


/**
 * Module exports.
 */
module.exports = Record;