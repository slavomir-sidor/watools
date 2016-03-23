/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
//var Category = require('Category.js');

var Brand = mongoose.model('Brand',
{
	Name : { type: String},

	Logo:{ type: String},
	
	Categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],

	Url: { type: String},

	Created: { type: Date, default: Date.now },

	Processed: { type: Date, default: Date.now },

	ProductCount: { type: Number, default: 0 }
});


/**
 * Module exports.
 */
module.exports = Brand;
