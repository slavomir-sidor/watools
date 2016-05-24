/**
 * 
 */

var requireDir = require('require-dir');
var stringify = require('node-stringify');
var mongoose = require('mongoose');

BlackBoard = function(name)
{
	console.log('Initializing SMILA Blackboard.');

	this.name = name;
	this.uristring = 'mongodb://localhost/' + this.name;
	this.mongoose = mongoose;

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

	this.models = requireDir('./Model/',
	{
		recurse: true
	});
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

BlackBoard.prototype.getRecords = function(model, data, limit,offset, callback)
{
	var entity = this.mongoose.model(model);
	entity.find(data, callback).skip(offset).limit(limit);
};

BlackBoard.prototype.exportRecords = function(model, data, limit, offset, callback)
{
	var entity = this.mongoose.model(model);
	entity.find(data, callback).skip(offset).limit(limit);
};

BlackBoard.prototype.getRecordsCount = function(model, data, callback)
{
	var entity = this.mongoose.model(model);
	return entity.find(data).count(callback);
};

BlackBoard.prototype.saveRecord = function(model, query, data, callback)
{
	var entity = this.mongoose.model(model);
	console.log(data);
	entity.findOneAndUpdate(query, data,
	{
		new:true,
		upsert : true
	}, function(err, doc)
	{
		callback(err, doc);
	});
};

BlackBoard.prototype.deleteRecords = function(model, data, callback)
{
	var entity = this.mongoose.model(model);
	entity.find(data).remove();
};

/**
 * Module exports.
 */
module.exports = BlackBoard;