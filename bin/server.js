'use strict';

var app = require('./')();
var port = 'PORT' in process.env ? process.env.PORT : 3005;

console.log('Listening on port:', port);

app.listen(port);