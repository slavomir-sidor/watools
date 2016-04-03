var q = require('./Webpage.js');

Google = function()
{
	this.url = "http://localhost/";
}

Google.prototype = new Webpage();
Google.prototype.constructor = Google;
Google.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);

	var categories = this.getPage().evaluate(function(){
		
	});

	callback();
}

var gp = new Google();
gp.process();