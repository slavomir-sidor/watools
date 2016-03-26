var system = require('system');
var args = system.args;
var webpage = require("webpage");

Webpage = function(url)
{
	this.url = url;
	this.page;
	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

Webpage.prototype.getPage = function(callback)
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

Webpage.prototype.onPageError = function(msg, trace)
{
	this.log(msg);
	var self = this;

	trace.forEach(function(item)
	{
		self.log('  ', item.file, ':', item.line);
	});
}

Webpage.prototype.onConsoleMessage = function(msg, lineNum, sourceId)
{
	this.log(msg);
}

Webpage.prototype.log = function(msg)
{
	console.log(msg);
	// this.logExtented(msg);
}

Webpage.prototype.logExtented = function(msg)
{
	console.log(util.inspect(msg, false, null));
}

Webpage.prototype.finish = function(status)
{
	this.log('Finish: ' + status);
	phantom.exit(0);
}

Webpage.prototype.process = function(callback)
{
	this.log('Opening page: ' + this.url);
	this.getPage(callback).open(this.url);
}

Webpage.prototype.onPageLoadFinished = function(status, callback)
{
	this.log('Page loaded: ' + status);
	if (status === "success")
	{
		var self = this;
		this.getPage(callback).includeJs("//code.jquery.com/jquery-1.12.0.min.js", function()
		{
			self.processPage(function()
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

Webpage.prototype.processPage = function()
{
	this.log('Processing page...');
}

/*
var url = "http://localhost";

if (args.length > 1)
{
	var url = args[1];
}

var acp = new Webpage(url);
acp.process();*/