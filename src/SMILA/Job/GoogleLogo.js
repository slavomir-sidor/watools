var web = require('./Webpage.js');
var system = require('system');
var args = system.args;

GoogleLogo = function(brand)
{
	this.page;
	this.brand = brand;
	this.url = 'https://www.google.cz/search?safe=off&tbm=isch&q="' + brand.replace(" ","+") + '"+company+logo&cad=h';
	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

GoogleLogo.prototype = new Webpage();
GoogleLogo.prototype.constructor = GoogleLogo;
GoogleLogo.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);
	
	var self = this;
	var image = this.page.evaluate(function(self)
	{
		console.log($('html').text());
		return $('img').eq(1).attr('src');
	});
}

var brandName = "";

if (args.length > 1)
{
	var brandName = args[1];
}

var gl = new GoogleLogo(brandName);
gl.process();