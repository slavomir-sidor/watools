/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Task = mongoose.model('Task',
{
	Name : { type: String },

	Worker: [{type: Schema.Types.ObjectId, ref: 'Worker'}],

	Job: [{type: Schema.Types.ObjectId, ref: 'Job'}]
});


/**
 * Module exports.
 */
module.exports = Task;