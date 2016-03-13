'use strict';

var express = require('express');
var Server = require('socket.io');
var io = new Server();
var requireDir = require('require-dir');
var fmt = require('util').format;
var util = require('util');
var SMILA = require('../src/SMILA/');
var Promise = require('promise');
require('es6-promise').polyfill();

module.exports = function()
{
	var app = express();
	var smila = new SMILA(app,io);

	app.get('/', function(req, res)
	{
		var s = req.socket;
		var msg = fmt('SMILA IS Running on %s:%d.\n', s.localAddress, s.localPort);
		var msg = msg + util.inspect(smila, false, null);
		res.send(msg);
	});

	app.get('/jobs', function(req, res)
	{
		res.json(util.inspect(smila.jobs, false, null));
	});

	app.get('/job', function(req, res)
	{
		res.json(smila.jobs);
	});

	app.post('/job', function(req, res)
	{
		console.log(req.parameter);
		//res.json(smila.run());
	});

	app.get('/pipelines', function(req, res)
	{
		res.json(smila.pipelines);
	});

	app.get('/pipeline', function(req, res)
	{
		res.json(smila.pipelines);
	});

	app.get('/models', function(req, res)
	{
		res.json(util.inspect(smila.jobs, false, null));
	});

	app.get('/model', function(req, res)
	{

		res.json(smila.mongoose.connection.Schema);
	});

	app.get('/records', function(req, res)
	{
		res.send(util.inspect(res, false, null));
	});

	app.get('/record', function(req, res)
	{
		res.send(util.inspect(res, false, null));
	});

	app.get('/info', function(req, res)
	{
		var s = req.socket;
		var msg = fmt('SMILA IS Running on %s:%d.\n', s.localAddress, s.localPort);
		msg = msg + "\nSMILA:\n" + util.inspect(smila, false, null);
		msg = msg + "\nSocket:\n" + util.inspect(s, false, null);
		msg = msg + "\nRequest:\n" + util.inspect(req, false, null);
		msg = msg + "\nResponse:\n" + util.inspect(res, false, null);

		res.send(msg);
	});

	app.get('/info/smila', function(req, res)
	{
		var s = req.socket;
		var msg = fmt('SMILA IS Running on %s:%d.\n', s.localAddress, s.localPort);
		msg = msg + "\nSMILA:\n" + util.inspect(SMILA, false, null);
		res.send(msg);
	});

	return app;
};
