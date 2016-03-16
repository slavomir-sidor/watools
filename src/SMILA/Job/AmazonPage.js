var system = require('system');
var webpage = require("webpage");
var fs = require('fs');
var async = require('async');
var q = require('q');

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
	phantom.exit(1);
}

AmazonPage.prototype.process = function(callback)
{
	this.log('Opening page: ' + this.url);

	this.getPage(callback).open(this.url);
}

AmazonPage.prototype.onPageLoadFinished = function(status, callback)
{
	this.log('Page load finished: ' + status);
	if (status === "success")
	{
		var self = this;
		this.getPage(callback).includeJs("http://127.0.0.1:3005/jquery-2.2.1.min.js", function()
		{
			self.processPage(function()
			{
				//self.getPage().release();
				//self.getPage().close();

				if (typeof callback != 'undefined')
				{
					callback();
				}
			});
		});
	}
	this.finish(status);
}

AmazonPage.prototype.processPage = function(callback)
{
	this.log('Processing page...');
	this.log('Creating screenshot: ' + this.getScreenshotFilename());
	this.getPage().render(this.getScreenshotFilename());
}