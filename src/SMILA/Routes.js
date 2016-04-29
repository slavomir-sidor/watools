
var express = require('express');

/**
 * WATools Module.
 */
Routes = function(smila)
{
	this.smila = smila;
	var router = express.Router();
};

Routes.prototype.run = function()
{
	/**
	 * 
	 */
	this.smila=smila;

	/**
	 * Application
	 */
	this.app=smila.app;

	

};

module.exports = Routes;