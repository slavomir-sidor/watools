'use strict';

var requireDir = require('require-dir');
var SMILA = require('../src/SMILA/');

module.exports = function()
{
	return new SMILA().app;
};
