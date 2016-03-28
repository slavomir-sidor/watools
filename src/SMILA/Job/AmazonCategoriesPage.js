var web = require('./Webpage.js');
var system = require('system');
var args = system.args;
var parse = require('url-parse');
var util = require('util');
var stringify = require('node-stringify');

AmazonCategoriesPage = function()
{
	this.url = "http://www.amazon.com/gp/site-directory/ref=nav_shopall_btn";
	this.categories = new Array();
}

AmazonCategoriesPage.prototype = new Webpage();
AmazonCategoriesPage.prototype.constructor = AmazonCategoriesPage;
AmazonCategoriesPage.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);

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
				Name : top.text(),
				AmazonCode : null,
				Url : null
			};

			var index = main.push(category);

			var subs = $('.fsdDeptCol a.fsdDeptLink', $(value));
			
			var parentIndex = index - 1;

			$.each(subs, function(indexSub, item)
			{
				var item = $(item);

				var c =
				{
					Name : item.text(),
					Parent : parentIndex,
					Url : 'http://www.amazon.com' + item.attr('href'),
					AmazonCode : null
				};

				if (c.Name !== "")
				{
					main.push(c);
				}
			});
		});

		console.log('Found ' + main.length + ' categories.');

		var i = 0;

		var processCategory = function()
		{
			if (i >= main.length)
			{
				return;
			}

			var category = main[i];

			console.log('Category [i] : ' + i);
			console.log('Category.Name : ' + category.Name);

			if (category.Url)
			{
				category.AmazonCode = category.Url.split('&').reduce(function(s, c)
				{
					var t = c.split('=');
					s[t[0]] = t[1];
					return s;
				}, {}).node;
			}
			console.log('Category.Url : ' + category.Url);
			console.log('Category.AmazonCode : ' + category.AmazonCode);
			console.log('Category.Parent : ' + category.Parent);
			
			if (category.Parent)
			{
				parentI = parseInt(category.Parent);
				var parentCategory=main[parentI];
				category.Parent = parentCategory._id;
				console.log('Category.Parent._id : ' + parentCategory._id);
			}
			
			console.log('Category.API call');
			
			var settings =
			{
				type : "POST",
				data :
				{
					query :
					{
						Name : category.Name
					},
					data : category
				},
				url : 'http://127.0.0.1:3005/blackboard/record/Category',
				async : false,
				success : function(data)
				{
					console.log('Category.API done '+data._id);
					main[i] = data;
					i++;
					processCategory();
				},

				error : function(data)
				{
					i++;
					processCategory();
				}
			};

			$.ajax(settings);
		};

		processCategory();

		return main;
	});
	callback();
	this.log('Amazon categories done.');
}

var url = "http://www.amazon.com/gp/site-directory/ref=nav_shopall_btn";

if (args.length > 1)
{
	var url = args[1];
}

var acp = new AmazonCategoriesPage(url);
acp.process();