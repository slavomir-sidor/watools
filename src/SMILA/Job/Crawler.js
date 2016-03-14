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
var request = require('request');
var stringify = require('node-stringify');

Crawler = function(url)
{
	this.url = url;
	this.request = request;
	this.request.get(url, function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			console.log(stringify(response));
		}
		else
		{
			console.log(error);
		}
	});
}

/**
 * Module exports.
 */
module.exports = Crawler;