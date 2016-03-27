/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Category = mongoose.model('Category',
{
	Name :
	{
		type : String
	},

	Parent :
	{
		type : Schema.Types.ObjectId,
		ref : 'Category'
	},

	PageMetaTitle :
	{
		type : String
	},

	PageH1 :
	{
		type : String
	},

	Url :
	{
		type : String
	},

	AmazonCode :
	{
		type : String
	},

	ProductCount :
	{
		type : Number
	}

});

/**
 * Module exports.
 */
module.exports = Category;
