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

require('es6-promise').polyfill();
var util = require('util');
var phantom = require('phantom');

Crawler = function()
{

	var request = require('request');
	request.get('http://www.whatever.com/my.csv', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        var csv = body;
	        // Continue with your processing here.
	    }
	});
};

Crawler.run = function()
{

};

/**
 * Module exports.
 */
module.exports = Crawler;