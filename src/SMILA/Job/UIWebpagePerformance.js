var q = require('./Webpage.js');
var system = require('system');
var args = system.args;
var stringify = require('node-stringify');

UIWebpagePerformance = function(url)
{
	this.url = url;
	this.categories = new Array();
}

UIWebpagePerformance.prototype = new Webpage();
UIWebpagePerformance.prototype.constructor = UIWebpagePerformance;
UIWebpagePerformance.prototype.processPage = function(callback)
{
	AmazonPage.prototype.processPage.call(this, callback);

	var self = this;

	var UIWebpagePerformance = this.getPage().evaluate(function()
	{
		return window.UIWebpagePerformance;
	});

	this.finish(stringify(this.UIWebpagePerformance));
}

var url = "http://www.amazon.com/gp/site-directory/ref=nav_shopall_btn";

if (args.length > 1)
{
	var url = args[1];
}
var gl = new UIWebpagePerformance(url);
gl.process();