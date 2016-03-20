var q = require('./Webpage.js');
var system = require('system');
var args = system.args;
var stringify = require('node-stringify');

Google = function(url)
{
	this.url = url;
	this.categories = new Array();
}

Google.prototype = new Webpage();
Google.prototype.constructor = Google;
Google.prototype.processPage = function(callback)
{
	AmazonPage.prototype.processPage.call(this, callback);

	var self = this;

	var categories = this.getPage().evaluate(function()
	{
		var groups = $(".fsdDeptBox");
		var main = new Array();

		$.each(groups, function(index, value)
		{
			var top = $('.fsdDeptTitle', $(value));

			var category =
			{
				name : top.text(),
				categories : null
			};

			var subs = $('a', $(value));

			$.each(subs, function(indexSub, item)
			{
				var c =
				{
					index : indexSub,
					parent : category.name,
					name : $(item).text(),
					href : 'http://www.amazon.com' + $(item).attr('href'),
					node : null,
					url : null
				};

				if (c.name !== "")
				{
					main.push(c);
				}
			});

		});

		return main;
	});

	this.getPage().close();

	for ( var i in categories)
	{
		var category = categories[i];
		var urlParsed = parse(category.href, true);

		if (typeof urlParsed.query.node == "undefined")
		{
			continue;
		}

		category.node = urlParsed.query.node;
		category = new AmazonCategoryPage(category);

		this.categories.push(category);
	}
	this.finish(stringify(this.categories));
}

var url = "http://www.amazon.com/gp/site-directory/ref=nav_shopall_btn";

if (args.length > 1)
{
	var url = args[1];
}
var gp = new Google(url);
gp.process();