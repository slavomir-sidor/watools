/**
 * Amazon Category Brands Page
 * 
 */
var web = require('./Webpage.js');
var system = require('system');
var args = system.args;
var parse = require('url-parse');
var util = require('util');
var stringify = require('node-stringify');

function AmazonCategoryBrandsPage(amazonCode, letter, categoryId)
{
	console.log('Amazon Category Brands Page.');
	this.categoryId = categoryId;
	this.url = "http://www.amazon.com/gp/search/other?page=1&pickerToList=brandtextbin&rh=n:" + amazonCode
			+ "&indexField=" + letter;
};

AmazonCategoryBrandsPage.prototype = new Webpage();
AmazonCategoryBrandsPage.prototype.constructor = AmazonCategoryBrandsPage;
AmazonCategoryBrandsPage.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);

	var self = this;
	var brands = this.getPage().evaluate(function()
	{
		var brandsElements = $(".s-see-all-indexbar-column a");
		var brands = new Array();

		$.each(brandsElements, function(index, brandElement)
		{
			var element = $(brandElement);
			var text = element.text();
			var url = 'http://www.amazon.com' + element.attr('href');
			var productCountRegExp = new RegExp("[0-9]+", "g");
			var productInfoRegExp = new RegExp("\\ \\([0-9]+\\)", "g");
			var productCountMatches = productCountRegExp.exec(text);
			var productCount = productCountMatches[0];
			var name = text.replace(productInfoRegExp, "");

			var brand =
			{
				Name : name,
				Categories : new Array(),
				Url : url,
				ProductCount : productCount
			};
			console.log(brand.ProductCount);

			brands.push(brand);
		});

		var postGoogleLogo = function(brand)
		{
			// AmazonBrandGoogleLogo
		};

		console.log('Found ' + brands.length + ' brands.');

		var i = 0;
		var postBrand = function()
		{
			if (i >= brands.length)
			{
				return;
			}

			var brand = brands[i];

			var settings =
			{
				type : "POST",
				data :
				{
					query :
					{
						Name : brand.Name
					},
					data : brand
				},
				url : 'http://127.0.0.1:3005/blackboard/record/Brand',
				async : false,
				success : function(data)
				{
					brands[i] = data;
					postGoogleLogo(data);
					i++;
					postBrand();
				},

				error : function(data)
				{
					i++;
					postBrand();
				}
			};

			$.ajax(settings);

		};

		postBrand();
	});

	console.log('done');
	callback();
}

var amazonCode = args[1];
var letter = args[2];
var categoryId = args[3];

var w = new AmazonCategoryBrandsPage(amazonCode, letter, categoryId);
w.process();