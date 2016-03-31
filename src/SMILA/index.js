/**
 * Semantic Information Logistic Architecture
 * 
 * @author Slavomir
 */

var express = require('express');
var http = require('http');
var io = require('socket.io');
var bodyParser = require('body-parser');
var Promise = require('promise');
var BlackBoard = require('./BlackBoard.js');
var WorkerManager = require('./WorkerManager.js');
var util = require('util');
var fmt = util.format;

SMILA = function(name, port, maxThreads)
{
	if (!name)
	{
		name = "node-smila";
	}
	if (!maxThreads)
	{
		maxThreads = 5;
	}
	this.port = 3005;
	if (!port && 'PORT' in process.env)
	{
		self.port = process.env.PORT;
	}
	this.name = name;
	this.maxThreads = maxThreads;

	console.log('Starting SMILA (' + this.name + ')');

	this.app = express();
	this.server = http.Server(this.app);
	this.io = io(this.server);
	this.bodyParser = bodyParser;
	this.blackBoard = new BlackBoard(this.name);
	this.workerManager = new WorkerManager(this);
};

SMILA.prototype.runWorkerJob = function(worker, job, params)
{
	console.log(params);
	return this.workerManager.runWorker(worker, job, params);
};

SMILA.prototype.start = function()
{
	console.log('Starting SMILA App on ' + this.port);

	var self = this;

	this.app.listen(this.port);

	this.app.use(express.static(__dirname + '/public'));

	this.app.use( bodyParser.json() );
	//this.app.use( express.multipart());

	this.app.use(this.bodyParser.urlencoded(
	{
		extended : true
	}));

	this.app.use(this.bodyParser.json());

	this.app.all('/*', function(req, res, next)
	{
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});

	/**
	 * Jobs
	 */
	this.app.get('/jobs', function(req, res)
	{
		res.send(self.workerManager.jobs);
	});

	/**
	 * Tasks
	 */
	this.app.get('/tasks', function(req, res)
	{
		res.send(self.workerManager.tasks);
	});

	this.app.post('/task/:worker/:job', function(req, res)
	{
		var worker = req.params.worker;
		var job = req.params.job;
		var worker = self.runWorkerJob(worker, job, req.body);

		res.json({
			command:worker.command,
			args:worker.args
		});
	});

	/**
	 * Workers
	 */
	this.app.get('/workers', function(req, res)
	{
		res.json(self.workerManager.workers);
	});

	/**
	 * Blackboard
	 */
	this.app.get('/blackboard', function(req, res)
	{
		res.json(self.blackBoard);
	});

	this.app.get('/blackboard/models', function(req, res)
	{
		res.json(self.blackBoard.getModels());
	});

	this.app.get('/blackboard/model/:model', function(req, res)
	{
		var results = res.json(self.blackBoard.getModel(req.params.model));
		return results;
	});

	/**
	 * Blackboard Records
	 */
	this.app.get('/blackboard/record/:model', function(req, res)
	{
		self.blackBoard.getRecords(req.params.model, req.body, function(err, records)
		{
			res.json(records);
		});
	});

	this.app.post('/blackboard/record/:model', function(req, res)
	{
		self.blackBoard.saveRecord(
				req.params.model,
				req.body.query,
				req.body.data,
				function(error, doc)
				{
					res.json(doc);
				}
		);
	});

	this.app.delete('/blackboard/record/:model', function(req, res)
	{
		self.blackBoard.deleteRecords(req.params.model, req.body);
		res.json();
	});

	/**
	 * Info
	 */
	this.app.get('/info/app', function(req, res)
	{
		res.json(self.app.locals);
	});

	this.app.get('/info/socket', function(req, res)
	{
		res.json(self.io);
	});

	this.app.get('/info/server', function(req, res)
	{
		res.json(self.server);
	});

	this.app.get('/pipelines', function(req, res)
	{
		res.json(self.workerManager.pipelines);
	});

	this.app.get('/pipeline:pipeline', function(req, res)
	{
		res.json(self.workerManager.pipelines[req.params.pipeline]);
	});

	this.app.get('/model', function(req, res)
	{
		res.json(self.blackBoard.schema);
	});

	this.app.get('/records', function(req, res)
	{
		res.send(self.blackBoard.getRecords());
	});

	this.app.get('/record', function(req, res)
	{
		res.send(util.inspect(res, false, null));
	});

	this.app.get('/ping', function(req, res)
	{
		req.io.route('hello');
		// res.send(stringify(this));
	});

	return this.app;
}

module.exports = SMILA;