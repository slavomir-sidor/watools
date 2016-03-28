var web = require('./Webpage.js');
var system = require('system');
var args = system.args;

TestMongo = function()
{
	this.page;
	this.url = 'http://localhost';
	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

TestMongo.prototype = new Webpage();
TestMongo.prototype.constructor = TestMongo;
TestMongo.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);
	
	var self = this;
	var image = this.page.evaluate(function(self)
	{
		$.ajax({
	        type: "GET",
	        url: remote_url,
	        async: false,
	        success : function(data) {
	            remote = data;
	        }
	    });
		return $('img').eq(1).attr('src');
	});
	console.log(image);
}

var gl = new TestMongo();
gl.process();