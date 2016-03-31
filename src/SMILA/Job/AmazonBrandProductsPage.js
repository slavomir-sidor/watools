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
}

AmazonBrandProductsPage.prototype = new Webpage();
AmazonBrandProductsPage.prototype.constructor = AmazonBrandProductsPage;
AmazonBrandProductsPage.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);

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

			var index = brands.push(
			{
				Name : brandText,
				Categories : new Array(),
				Url : brandUrl,
				ProductCount : 0
			});

		});

		console.log('Found ' + brands.length + ' brands.');
		return;
		var i = 0;
		var processBrand = function()
		{
			if (i >= brands.length)
			{
				return;
			}

			var brand = brands[i];

			console.log('Brand [i] : ' + i);
			console.log('Brand.Name : ' + brand.Name);
			console.log('Brand.Url : ' + 'http://www.amazon.com/' + brand.Url);
			console.log('Brand.API call');

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
					console.log('Brand.API done ' + data._id);
					brands[i] = brand;
					i++;
					processBrand();
				},

				error : function(data)
				{
					i++;
					processBrand();
				}
			};

			$.ajax(settings);

		};

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