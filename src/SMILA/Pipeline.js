/**
 * Pipelines: a system for processing synchronous requests (e.g. search
 * 
 * requests) by orchestrating easy-to-implement components (pipelets) in
 * workflows defined in BPEL.
 * 
 * @todo Avaiability realtime data aggregation
 */
/**
 * Module exports.
 */

Pipeline = function(name)
{
	this.name = name;
};

Pipeline.prototype.run = function(webpage)
{
	
};

module.exports = Pipeline;