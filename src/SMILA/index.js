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

require('es6-promise').polyfill();

SMILA = function(name, maxThreads)
{
	var self = this;

	if (!name)
	{
		name = "SMILA";
	}

	if (!maxThreads)
	{
		maxThreads = -1;
	}

	console.log('Running Smila ' + name);

	self.name = name;
	self.maxThreads = maxThreads;
	self.app = express();

	self.app.use(bodyParser());

	self.server = require('http').Server(self.app);
	self.io = require('socket.io')(self.server);
	self.blackBoard = new BlackBoard(this);
	self.workerManager = new WorkerManager(this);

	self.app.use(express.static(__dirname + '/public'));

	self.app.get('/jobs', function(req, res)
	{
		res.json(util.inspect(self.workerManager.jobs, false, null));
	});

	self.app.get('/job', function(req, res)
	{
		var job = req.param('jobName');
		var url = req.param('url');

		// res.send(util.inspect(self.workerManager.jobs['jobName'], false,
		// null));
	});

	self.app.post('/job', function(req, res)
	{
		var job = req.body.jobName;
		var url = req.body.url;
		var worker=self.runJob(job,url);
		res.send({});
	});

	self.app.get('/pipelines', function(req, res)
	{
		res.json(smila.pipelines);
	});

	self.app.get('/pipeline', function(req, res)
	{
		res.json(smila.pipelines);
	});

	self.app.get('/models', function(req, res)
	{
		res.json(util.inspect(smila.jobs, false, null));
	});

	self.app.get('/model', function(req, res)
	{

		res.json(smila.mongoose.connection.Schema);
	});

	self.app.get('/records', function(req, res)
	{
		res.send(util.inspect(res, false, null));
	});

	self.app.get('/record', function(req, res)
	{
		res.send(util.inspect(res, false, null));
	});

	self.app.get('/info', function(req, res)
	{
		var s = req.socket;
		var msg = fmt('SMILA IS Running on %s:%d.\n', s.localAddress, s.localPort);
		msg = msg + util.inspect(this, false, null);
		res.send(msg);
	});

	self.io.on('connection', function(socket)
	{
		socket.emit('news',
		{
			hello : 'world'
		});

		socket.on('my other event', function(data)
		{
			console.log(data);
		});
	});
};

SMILA.prototype.runJob = function(job, url)
{
	return this.workerManager.run(job, url);
};

module.exports = SMILA;