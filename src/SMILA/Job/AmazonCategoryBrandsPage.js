/**
 * Amazon Category Brands Page
 * 
 */

var system = require('system');
var webpage = require("webpage");
var fs = require('fs');
var async = require('async');
var q = require('q');

function AmazonCategoryBrandsPage(category, letter)
{
	console.log('Amazon Category Brands Page.');
	this.category = category;
	this.letter = letter;
	this.url = 'http://www.amazon.com/gp/search/other?page=1&pickerToList=brandtextbin&rh=n:' + category.node;
}

AmazonCategoryBrandsPage.prototype = new AmazonPage();
AmazonCategoryBrandsPage.prototype.constructor = AmazonCategoryPage;
AmazonCategoryBrandsPage.prototype.processPage = function(callback)
{
	var self = this;

	var links = this.getPage().evaluate(function()
	{
		var anchors = $("#indexBarHeader:first .pagnLink a");
		var links = new Array();

		$.each(anchors, function(index, link)
		{
			var l =
			{
				label : $(link).text(),
				href : 'http://www.amazon.com' + $(link).attr('href'),
			};

			links.push(l);
		});
		return links;
	});

	for ( var i in links)
	{
		var link = links[i];
		console.log(link.label + ' : ' + link.href);
	}

	this.log('Processing Categories Page done.');

	AmazonPage.prototype.processPage.call(this, callback);
}

if (args.length > 1)
{
	var url = args[1];
}

var w = new AmazonCategoryBrandsPage(url);
w.process();