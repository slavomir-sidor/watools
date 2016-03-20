/**
 * Crawlers: concepts and basic implementations for scalable components that
 * extract data from data sources.
 * 
 * Crawler - A crawler is a special worker in an asynchronous workflow that
 * imports data from a data source (e.g. filesystem, web or database) into
 * SMILA.
 * 
 * It iterates over the data elements and creates records for all elements that
 * will be further processed in the workflow. In general crawlers resp. crawl
 * workflows are used for initial (bulk) import of data sources. (see SMILA
 * Importing for more details)
 */

Crawler = function()
{
	this.page = webpage.create();
};

Crawler.run = function()
{
	phantom.create().then(function(ph)
	{
		ph.createPage().then(function(page)
		{
			page.open('https://stackoverflow.com/').then(function(status)
			{
				console.log(status);
				page.property('content').then(function(content)
				{
					console.log(content);
					page.close();
					ph.exit();
				});
			});
		});
	});
};

/**
 * Module exports.
 */
module.exports = Crawler;