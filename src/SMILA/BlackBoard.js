/**
 * 
 */

var requireDir = require('require-dir');

BlackBoard = function(name)
{
	console.log('Initializing SMILA Blackboard.');

	this.name = name;
	this.uristring = 'mongodb://localhost/' + this.name;
	this.mongoose = require('mongoose');

	var self = this;

	this.mongoose.connection.on('error', function()
	{
		self.onError();
	});

	this.mongoose.connection.once('open', function()
	{
		self.onOpen();
	});

	this.mongoose.connect(this.uristring);
};

BlackBoard.prototype.onError = function()
{
	console.log('BlackBoard Connection error (' + this.uristring + ')');
};

BlackBoard.prototype.onOpen = function()
{
	console.log('BlackBoard Succeeded connected to: ' + this.uristring);

	this.models = requireDir('./Model/');
};

BlackBoard.prototype.getModels = function()
{
	return this.mongoose.modelSchemas;
};

BlackBoard.prototype.getModel = function(model)
{
	var models = this.mongoose.modelSchemas;

	return models[model];
};

BlackBoard.prototype.getRecords = function(model, data, callback)
{
	var entity = this.mongoose.model(model);
	entity.find(data, callback);
};

BlackBoard.prototype.saveRecord = function(model, query, data, callback)
{
	var entity = this.mongoose.model(model);
	entity.findOneAndUpdate(query, data,
	{
		new:true,
		upsert : true
	}, function(err, doc)
	{
		console.log(err);
		console.log(doc);
		callback(err, doc);
	});
};

BlackBoard.prototype.deleteRecords = function(model, data, callback)
{
	console.log(data);
	var entity = this.mongoose.model(model);
	entity.find(data).remove();
};

/**
 * Module exports.
 */
module.exports = BlackBoard;