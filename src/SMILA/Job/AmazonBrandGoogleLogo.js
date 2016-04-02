var web = require('./Webpage.js');
var system = require('system');
var args = system.args;

AmazonBrandGoogleLogo = function(brandName, brandId)
{
	this.page;
	this.brandName = brandName;
	this.brandId = brandId;

	this.url = 'https://www.google.cz/search?safe=off&tbm=isch&q="' + this.brandName.replace(" ", "+")
			+ '"+company+logo&cad=h';
	this.pageViewportSize =
	{
		width : 1920,
		height : 1200
	};
}

AmazonBrandGoogleLogo.prototype = new Webpage();
AmazonBrandGoogleLogo.prototype.constructor = AmazonBrandGoogleLogo;
AmazonBrandGoogleLogo.prototype.processPage = function(callback)
{
	Webpage.prototype.processPage.call(this, callback);

	var self = this;

	this.page.evaluate(function(self)
	{
		var source = $('img').eq(1).attr('src');
		var brand =
		{
			Name : self.brandName,
			Logo : source
		};
		
		var postBrand = function(brand)
		{
			var settings =
			{
				type : "POST",
				data :
				{
					query :
					{
						Name : brand.Name
					},
					data : brand
				},
				url : 'http://127.0.0.1:3005/blackboard/record/Brand',
				async : false,
				success : function(data)
				{
					return data;
				},

				error : function(data)
				{
					return data;
				}
			};
			$.ajax(settings);
		};

		postBrand(brand);

	});

	callback();

}

var brandName = args[1];
var brandId = args[1];

var gl = new AmazonBrandGoogleLogo(brandName, brandId);
gl.process();