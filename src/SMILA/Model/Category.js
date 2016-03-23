/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Category = mongoose.model('Category',
{
	Name : { type: String},
	
	Parent: {type: Schema.Types.ObjectId, ref: 'Category'},
	
	PageMetaTitle: { type: String},
	
	PageH1:{ type: String},

	Created: { type: Date, default: Date.now },
	
	Processed: { type: Date, default: Date.now },

	ProductCount: { type: Number, default: 0 }
	
});


/**
 * Module exports.
 */
module.exports = Category;
