var webpage = require("webpage");
var system = require('system');
var args = system.args;

/**
 * Web Page
 * 
 */
Crawler = function(url)
{
	this.url = url;
	this.page;
	this.currentDir;
	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

Crawler.prototype.getPage = function(callback)
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

Crawler.prototype.onPageError = function(msg, trace)
{
	this.log(msg);

	var self = this;

	trace.forEach(function(item)
	{
		self.log('  ', item.file, ':', item.line);
	});
}

Crawler.prototype.onConsoleMessage = function(msg, lineNum, sourceId)
{
	this.log(msg);
}

Crawler.prototype.log = function(msg)
{
	console.log(msg);
	// this.logExtented(msg);
}

Crawler.prototype.logExtented = function(msg)
{
	console.log(util.inspect(msg, false, null));
}

Crawler.prototype.finish = function(status)
{
	this.log('Finish: ' + status);
	phantom.exit(1);
}

Crawler.prototype.process = function(callback)
{
	this.log('Opening page: ' + this.url);

	this.getPage(callback).open(this.url);
}

Crawler.prototype.onPageLoadFinished = function(status, callback)
{
	this.log('Page load finished: ' + status);

	if (status === "success")
	{
		var self = this;

		this.getPage(callback).includeJs("//code.jquery.com/jquery-1.12.0.min.js", function()
		{

			self.processPage(function()
			{
				console.log('Prcess Page callback');
			});
			self.finish(status);
		});
	}
}

Crawler.prototype.process = function(callback)
{
	this.log('Processing Page ...');
}