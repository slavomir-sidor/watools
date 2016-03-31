/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Product = mongoose.model('Product',
{
	Name :
	{
		type : String
	},

	Brand :
	{
		type : Schema.Types.ObjectId,
		ref : 'Brand'
	},

	Category :
	[
		{
			type : Schema.Types.ObjectId,
			ref : 'Category'
		}
	],

	Url :
	{
		type : Schema.Types.ObjectId,
		ref : 'Url'
	},

	PageMetaTitle :
	{
		type : String
	},

	PageH1 :
	{
		type : String
	}
});

/**
 * Module exports.
 */
module.exports = Product;