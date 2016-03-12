'use strict';

var requireDir = require('require-dir');
var express = require('express');
var Server = require('socket.io');
var io = new Server();
require('../src/SMILA/SMILA.js');
var requireDir = require('require-dir');
var fmt = require('util').format;
var util = require('util');

module.exports = function()
{
	var app = express();
	var smila = new SMILA("SMILA");

	app.get('/', function(req, res)
	{
		var s = req.socket;

		var msg = fmt('SMILA IS Running on %s:%d.\n', s.localAddress, s.localPort);
		console.log(msg);

		res.send(msg);
	});

	app.get('/jobs', function(req, res)
	{
		var data =
		{
			message : 'Hello, World!',
			pid : process.pid,
			address : req.socket.localAddress,
			port : req.socket.localPort,
			count : 0
		};

		console.log(util.inspect(data, false, null));

		res.json(data);
	});

	app.get('/job', function(req, res)
	{
		var data =
		{
			message : 'Hello, World!',
			pid : process.pid,
			address : req.socket.localAddress,
			port : req.socket.localPort,
			count : jobs.length
		};

		console.log('Jobs Requested ');

		res.json(data);
	});

	app.get('/models', function(req, res)
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

	io.on('connection', function(socket)
	{
		console.log('a user connected');

		socket.on('disconnect', function()
		{
			console.log('user disconnected');
		});
	});

	io.on('connection', function(socket)
	{
		console.log('a user connected');

		socket.on('disconnect', function()
		{
			console.log('user disconnected');
		});
	});

	return app;
};
