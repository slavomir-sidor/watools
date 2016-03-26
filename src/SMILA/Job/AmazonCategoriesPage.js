var system = require('system');
var args = system.args;
var stringify = require('node-stringify');
var system = require('system');
var webpage = require("webpage");


/**
 * Amazon Page
 * 
 */
AmazonPage = function(url)
{
	this.url = url;
	this.page;
	this.currentDir;
	this.screenshotDir = 'screenshots';
	this.csvDir = 'csv';
	this.screenshotFilename;
	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

AmazonPage.prototype.printSeparator = function()
{
	this.log('--------------------------------------------------------------------');
}

AmazonPage.prototype.getScreenshotFilename = function()
{
	if (null == this.screenshotFilename)
	{
		var urlParse = parse(this.url);
		this.screenshotFilename = this.screenshotDir + '/';

		if (urlParse.host == "about:blank")
		{

			this.screenshotFilename += "blank";
		}
		else
		{
			this.screenshotFilename += urlParse.host;
		}

		if (typeof urlParse.pathname != "undefined")
		{
			this.screenshotFilename += urlParse.pathname;
		}

		if (typeof urlParse.query != "undefined")
		{
			var name = urlParse.query.replace("&", '-');
			this.screenshotFilename += name;
		}

		this.screenshotFilename += ".png";
	}

	return this.screenshotFilename;
}

AmazonPage.prototype.getCurrentDir = function()
{
	if (this.currentDir == null)
	{
		this.currentDir = './';
	}

	return this.currentDir;
}

AmazonPage.prototype.getPage = function(callback)
{
	if (this.page == null)
	{
		var self = this;
		
		page = webpage.create();
		page.viewportSize = this.pageViewportSize;

		page.onError = function(msg, trace)
		{
			self.onPageError(this, msg, trace);
		};

		page.onConsoleMessage = function(msg, lineNum, sourceId)
		{
			self.onConsoleMessage(msg, lineNum, sourceId);
		};

		page.onLoadFinished = function(status)
		{
			self.onPageLoadFinished(status, callback);
		};

		this.page = page;
	}

	return this.page;
}

AmazonPage.prototype.onPageError = function(msg, trace)
{
	this.log(msg);
	var self = this;

	trace.forEach(function(item)
	{
		self.log('  ', item.file, ':', item.line);
	});
}

AmazonPage.prototype.onConsoleMessage = function(msg, lineNum, sourceId)
{
	this.log(msg);
}

AmazonPage.prototype.log = function(msg)
{
	console.log(msg);
	// this.logExtented(msg);
}

AmazonPage.prototype.logExtented = function(msg)
{
	console.log(util.inspect(msg, false, null));
}

AmazonPage.prototype.finish = function(status)
{
	this.log('Finish: ' + status);
	phantom.exit(0);
}

AmazonPage.prototype.process = function(callback)
{
	this.log('Opening page: ' + this.url);
	this.getPage(callback).open(this.url);
}

AmazonPage.prototype.onPageLoadFinished = function(status, callback)
{
	this.log('Page loaded: ' + status);
	if (status === "success")
	{
		var self = this;
		this.getPage(callback).includeJs("http://code.jquery.com/jquery-1.12.0.min.js", function()
		{
			self.processPage(self, function()
			{
				
			});
			self.finish(status);
		});
	}
	else
	{
		this.finish(status);
	}
}

AmazonPage.prototype.processPage = function(callback)
{
	this.log('Processing page...');
	this.log('Creating screenshot: ' + this.getScreenshotFilename());
	this.getPage().render(this.getScreenshotFilename());
}


AmazonCategoriesPage = function(url)
{
	console.log('Amazon Categories Page.');
	
	this.url=url;
	this.categories = new Array();
}
AmazonCategoriesPage.prototype = new AmazonPage();
AmazonCategoriesPage.prototype.constructor = AmazonCategoriesPage;
AmazonCategoriesPage.prototype.processPage = function(callback)
{
	AmazonPage.prototype.processPage.call(this, callback);

	this.log('Processing Categories Page ...');

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
	console.log('categories');
}

var url = "http://www.amazon.com/gp/site-directory/ref=nav_shopall_btn";

if (args.length > 1)
{
	var url = args[1];
}

var acp = new AmazonCategoriesPage(url);
acp.process();