/**
 * 
 */

var requireDir = require('require-dir');

BlackBoard = function(smila)
{
	console.log('Initializing SMILA Blackboard.');

	this.smila = smila;
	this.name = this.smila.name;
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

BlackBoard.prototype.getRecords = function(model)
{
	var entity = this.mongoose.model(model);
	//var model = this.mongoose.modelSchemas[model];
	var count=entity.count();
	return count;
};

BlackBoard.prototype.saveRecord = function(model, data)
{
	var entity = this.mongoose.model(model);
	var item=new entity(data);
	item.save();
};

BlackBoard.prototype.getRecord = function(model, data)
{
	return this.mongoose.model(model).find(data);
};

/**
 * Module exports.
 */
module.exports = BlackBoard;