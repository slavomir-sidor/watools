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
var phantom = require('phantom');

SMILA.Crawler.prototype.constructor = SMILA.Crawler;
SMILA.Crawler = function(url)
{
	this.phantom = phantom.create().then(function(ph)
	{
		ph.createPage().then(function(page)
		{
			page.open(url).then(function(status)
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
