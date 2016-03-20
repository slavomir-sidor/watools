var q = require('./Webpage.js');
var system = require('system');
var args = system.args;
var stringify = require('node-stringify');

Performance = function(url)
{
	this.url = url;
	this.categories = new Array();
}

Performance.prototype = new Webpage();
Performance.prototype.constructor = Performance;
Performance.prototype.processPage = function(callback)
{
	AmazonPage.prototype.processPage.call(this, callback);

	var self = this;

	var performance = this.getPage().evaluate(function()
	{
		return window.performance;
	});

	this.finish(stringify(this.performance));
}

var url = "http://www.amazon.com/gp/site-directory/ref=nav_shopall_btn";

if (args.length > 1)
{
	var url = args[1];
}
var gl = new Performance(url);
gl.process();