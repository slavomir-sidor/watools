/**
 * Amazon Page
 * 
 */
JQueryCrawler = function(url)
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

JQueryCrawler.prototype.printSeparator = function()
{
	this.log('--------------------------------------------------------------------');
}

JQueryCrawler.prototype.getScreenshotFilename = function()
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

JQueryCrawler.prototype.getCurrentDir = function()
{
	if (this.currentDir == null)
	{
		this.currentDir = './';
	}

	return this.currentDir;
}

JQueryCrawler.prototype.getPage = function(callback)
{
	if (this.page == null)
	{
		var self = this;

		phantom.create().then(function(ph)
		{
			ph.createPage().then(function(page)
			{
				// use page
				ph.exit();
			});
		});

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

JQueryCrawler.prototype.onPageError = function(msg, trace)
{
	this.log(msg);
	var self = this;

	trace.forEach(function(item)
	{
		self.log('  ', item.file, ':', item.line);
	});
}

JQueryCrawler.prototype.onConsoleMessage = function(msg, lineNum, sourceId)
{
	this.log(msg);
}

JQueryCrawler.prototype.log = function(msg)
{
	console.log(msg);
	// this.logExtented(msg);
}

JQueryCrawler.prototype.logExtented = function(msg)
{
	console.log(util.inspect(msg, false, null));
}

JQueryCrawler.prototype.finish = function(status)
{
	this.log('Finish: ' + status);
	phantom.exit(0);
}

JQueryCrawler.prototype.process = function(callback)
{
	this.log('Opening page: ' + this.url);
	this.getPage(callback).open(this.url);
}

JQueryCrawler.prototype.onPageLoadFinished = function(status, callback)
{
	this.log('Page loaded: ' + status);
	if (status === "success")
	{
		var self = this;
		this.getPage(callback).includeJs("http://code.jquery.com/jquery-1.12.0.min.js", function()
		{
			self.processPage(self, function()
			{
				self.getPage().release();
				self.getPage().close();

				return callback();
			});
		});
	}
	else
	{
		this.finish(status);
	}
}

JQueryCrawler.prototype.processPage = function(callback)
{
	this.log('Processing page...');
	this.log('Creating screenshot: ' + this.getScreenshotFilename());
	this.getPage().render(this.getScreenshotFilename());
}

/**
 * Module exports.
 */
module.exports = JQueryCrawler;