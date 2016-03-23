'use strict';

var SMILA = require('../src/SMILA');

module.exports = function()
{
	return new SMILA().start().app;
};