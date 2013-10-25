var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	SerialPort = require('serialport').SerialPort,
	xbee = new SerialPort('/dev/ttyUSB0'),
	status = '';

// tell where the files served by the server are
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

server.listen(3000);

// when the xbee receive data, transfer it to the web clients
xbee.on('data', function(data) {
	status += data;
	if (status.indexOf('}') > 0) {
		var value = JSON.parse(status);
		// send to all clients connected
		io.sockets.emit('value', value);
		status = '';
	}
});