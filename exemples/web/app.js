var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	Screenshot = require('./screenshot'),
	serialport = require('serialport'),
	SerialPort = serialport.SerialPort
	sp = new SerialPort('/dev/ttyUSB0'),
	clicks = 0;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.get('/status', function(req, res) {
	sp.write('s');
	var status = '';
	var cb = function(data) {
		status += data;
		if (status.indexOf('}') > 0) {
			res.send(JSON.parse(status));
			status = '';
			sp.removeListener('data', cb);
		}
	};
	sp.on('data', cb);

});

server.listen(3000);

screenshot = new Screenshot({
	device: '/dev/video0',
	quality: 30,
	frequency: 1
});

screenshot.on('frame', function(image) {
	var image64 = image.toString('base64');
	io.sockets.emit('img', { src : image64 });
});

screenshot.grab();

io.sockets.on('connection', function (socket) {
	socket.on('green', function () {
		clicks++;
		console.log('green');
		socket.broadcast.emit('update', { led: 'green'});
		sp.write('0');
	});
	socket.on('yellow', function () {
		clicks++;
		console.log('yellow');
		socket.broadcast.emit('update', { led: 'yellow'});
		sp.write('1');
	});
	socket.on('red', function () {
		clicks++;
		console.log('red');
		socket.broadcast.emit('update', { led: 'red'});
		sp.write('2');
	});
});

var out = function () {
        console.log('Number of clicks:' + clicks);
        process.exit();
};
process.on('SIGTERM', out);
process.on('SIGINT', out);