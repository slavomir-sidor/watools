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
var system = require('system');
var process = require('process');
var stringify = require('node-stringify');
var Promise = require('es6-promise');

Webpage = function(url)
{

	var self = this;
	this.url = url;

	phantom.create().then(function(ph)
	{
		ph.createPage().then(function(page)
		{
			// use page
			ph.exit();
		});
	});

	/*
	 * 
	 * phantom.create(function(err, ph) { return ph.createPage(function(err,
	 * page) { return page.open(url, function(err, status) { console.log("opened
	 * site? ", status);
	 * page.includeJs('http://127.0.0.1:3005/jquery-2.2.1.min.js', function(err) {
	 * setTimeout(function() { return page.evaluate(function() { return {
	 * asdasd: "asdasd" } ; }, function(err, result) { console.log(result);
	 * ph.exit(); }); }, 5000); }); }); }); }, { parameters : {
	 * 'ignore-ssl-errors' : 'yes' } });
	 */

};

/**
 * Module exports.
 */
module.exports = Webpage;