/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var requireDir = require('require-dir');
var mongoose = require("mongoose");
var fmt = require('util').format;
var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var stringify = require('node-stringify');
var Promise = require('promise');
var BlackBoard = require('./BlackBoard.js');
var WorkerManager = require('./WorkerManager.js');

SMILA = function(name, port, maxThreads)
{

	var self = this;

	if (!name)
	{
		name = "SMILA";
	}
	console.log('Running Smila ' + name);

	if (!maxThreads)
	{
		maxThreads = -1;
	}

	self.port = 3005;
	if (!port && 'PORT' in process.env)
	{
		self.port = process.env.PORT;
	}

	self.name = name;

	self.maxThreads = maxThreads;

	self.app = express();
	self.app.use(bodyParser());

	self.server = require('http').createServer(self.app);

	self.start = self.app.listen = function()
	{
		return self.server.listen.apply(self.server, arguments)
	};

	self.io = require('socket.io').listen(self.server);
	self.io.on('connection', function(socket)
	{
		console.log('connection');
		
		socket.on('event', function(data)
		{
			console.log('event');
			console.log(data);
		});

		socket.on('disconnect', function()
		{
			console.log('disconnect');
		});
	});

	self.blackBoard = new BlackBoard(this);
	self.workerManager = new WorkerManager(this);

	self.app.use(express.static(__dirname + '/public'));

	self.app.get('/jobs', function(req, res)
	{
		res.json(stringify(self.workerManager));
	});

	self.app.get('/job', function(req, res)
	{
		var jobName = req.param('jobName');
		var url = req.param('url');

		res.json(stringify(self.workerManager.jobs[jobName]));
	});

	self.app.get('/tasks', function(req, res)
	{
		res.json(self.workerManager);
	});

	self.app.post('/task', function(req, res)
	{
		var job = req.body.jobName;
		var url = req.body.url;
		var worker = self.runJob(job, url);

		res.json({worker:worker});
	});

	self.app.post('/workers', function(req, res)
	{
		res.json(stringify(this.workerManager.workers));
	});

	self.app.get('/pipelines', function(req, res)
	{
		res.json(stringify(this.workerManager.pipelines));
	});

	self.app.get('/pipeline', function(req, res)
	{
		var pipelineName = req.param('pipelineName');

		res.json(stringify(self.workerManager.pipelines[pipelineName]));
	});

	self.app.get('/models', function(req, res)
	{
		res.json(stringify((smila.blackBoard.db)));
	});

	self.app.get('/model', function(req, res)
	{
		res.json(self.blackBoard.smila.mongoose.connection.Schema);
	});

	self.app.get('/records', function(req, res)
	{
		res.send(stringify(self.blackBoard.getRecords()));
	});

	self.app.get('/record', function(req, res)
	{
		var pipelineName = req.param('pipelineName');

		res.send(util.inspect(res, false, null));
	});

	self.app.get('/info', function(req, res)
	{
		res.send(stringify(this));
	});

	self.app.get('/ping', function(req, res)
	{
		req.io.route('hello');
		// res.send(stringify(this));
	});

	console.log('Running SMILA Server' + name);
	self.start(self.port);
};

SMILA.prototype.runJob = function(job, url)
{
	return this.workerManager.run(job, url);
};

module.exports = SMILA;