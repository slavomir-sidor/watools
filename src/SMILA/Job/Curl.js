var web = require('./Webpage.js');
var system = require('system');
var args = system.args;

CURL = function()
{
	this.page;
	this.url = 'http://localhost/';

	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

CURL.prototype = new Webpage();
CURL.prototype.constructor = CURL;
CURL.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);

	var self = this;

	this.page.evaluate(function(self)
	{
		console.log('CURL is running');

		var post = function()
		{
			console.log('CURL API Call..');

			var settings =
			{
				type : "POST",

				url : 'http://127.0.0.1:3005/task/Phantom/Google',

				async : false,

				success : function(data)
				{
					console.log('CURL API Call Done');
				},

				error : function(data)
				{

					console.log('CURL API Call Error');
				}
			};

			$.ajax(settings);
		};

		post();
		post();

		console.log('CURL done');

	});

	callback();

}

var gl = new CURL();
gl.process();