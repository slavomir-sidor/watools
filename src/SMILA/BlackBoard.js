/**
 * 
 */

var mongoose = require('mongoose');
var requireDir = require('require-dir');
var Models = requireDir('./Model/');

BlackBoard = function(smila)
{
	var self = this;

	self.smila = smila;
	self.models = new Array();
	self.uristring = 'mongodb://localhost/' + self.smila.name;
	self.mongoose = mongoose;
	self.db = self.mongoose.connection;

	self.db.on('error', function(console)
	{
		self.onError(console);
	});

	self.db.once('open', function()
	{
		self.onOpen();

		console.log('Importing Models ... ');

		for (modelName in Models)
		{
			var model = self.mongoose.model(modelName);

			console.log('Importing Model: ' + modelName);

			self.models[modelName] = model;
		}
	});
};

BlackBoard.prototype.onError = function(console)
{
	console.error.bind(console, 'BlackBoard Connection error:');
};

BlackBoard.prototype.onOpen = function(console)
{
	console.log('BlackBoard Succeeded connected to: ' + self.uristring);
};

BlackBoard.prototype.saveRecord = function(id)
{

};

BlackBoard.prototype.getRecord = function(id)
{

};

BlackBoard.prototype.getRecordMetadata = function(id)
{

};

/**
 * Module exports.
 */
module.exports = BlackBoard;
