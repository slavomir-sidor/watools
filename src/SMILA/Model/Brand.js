/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
// var Category = require('Category.js');

var Brand = mongoose.model('Brand',
{
	Name : { type: String},

	Categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],

	Logo:{ type: String},

	Url: { type: String},

	ProductCount: { type: Number, default: 0 }
});


/**
 * Module exports.
 */
module.exports = Brand;
