/**
 * Amazon Brand Products Page
 * 
 */
var web = require('./Webpage.js');
var system = require('system');
var args = system.args;
var parse = require('url-parse');
var util = require('util');
var stringify = require('node-stringify');

function AmazonBrandProductsPage(amazonCode, letter, categoryId)
{
	console.log('Amazon Category Brands Page.');
	this.categoryId = categoryId;
	this.url = "http://www.amazon.com/gp/search/other?page=1&pickerToList=brandtextbin&rh=n:" + amazonCode
			+ "&indexField=" + letter;
};

AmazonBrandProductsPage.prototype = new Webpage();
AmazonBrandProductsPage.prototype.constructor = AmazonBrandProductsPage;
AmazonBrandProductsPage.prototype.processPage = function(callback)
{
	Webpage.prototype.prcessPage.call(this, callback);

	var self = this;

	var brands = this.getPage().evaluate(function()
	{
		var brandsElements = $(".s-see-all-indexbar-column a");
		var brands = new Array();

		$.each(brandsElements, function(index, brandElement)
		{
			var brandElement = $(brandElement);
			var brandText = $(brandElement).text();
			var productCountRegExp = new RegExp("\([0-9]+\)");
			var productCount = productCountRe.exec(brandText);
			var brandUrl = 'http://www.amazon.com/' + brandElement.attr('href');

			var brand =
			{
				Name : brandText,
				Categories : new Array(),
				Url : brandUrl,
				ProductCount : 0
			};
			console.log(brand);
			var index = brands.push(brand);
		});

		processBrand();
	});

	console.log('done');
	callback();
}

var amazonCode = args[1];
var letter = args[2];
var categoryId = args[3];

var w = new AmazonCategoryBrandsPage(amazonCode, letter, categoryId);
w.process();