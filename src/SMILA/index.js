/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */
var requireDir = require('require-dir');
var Jobs = requireDir('./Job/');
var Pipelines = requireDir('./Pipeline/');
var mongoose = require("mongoose");
var Models = requireDir('./Model/');
var WorkerManager = require('./WorkerManager.js');

SMILA = function(express, io)
{
	var self = this;

	this.name = "SMILA";
	this.jobs = new Array();
	this.express = express;
	this.io = io;
	this.mongoose = mongoose;
	this.mongooseUristring = 'mongodb://localhost/' + this.name;
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function()
	{
		console.log('Succeeded connected to: ' + self.mongooseUristring);
		console.log('Importing Models ... ');

		self.models = new Array();

		for (modelName in Models)
		{
			var model = self.mongoose.model(modelName);
			self.models[modelName] = model;
			console.log('Importing Model: ' + modelName);
		}
	});

	mongoose.connect(this.mongooseUristring);

	console.log('Importing Jobs ... ');
	for (job in Jobs)
	{
		this.jobs[job] = Jobs[job];
		console.log('Importing Job: ' + job);
	}
	
	this.pipelines = Pipelines;
	this.workerManager = new WorkerManager();

	io.on('connection', function(socket)
	{
		console.log('SMILA user connected');

		socket.on('disconnect', function()
		{
			console.log('user disconnected');
		});
	});
}

SMILA.runJob = function(job, url)
{

};

module.exports = SMILA;