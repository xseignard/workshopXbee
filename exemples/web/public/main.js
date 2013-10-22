(function() {
	var socket = io.connect('http://82.235.243.114/');

	new QRCode('qrcode', {
    	text: 'http://82.235.243.114/',
    	width: 128,
    	height: 128,
    	colorDark : '#e52107',
    	colorLight : '#ffffff',
    	correctLevel : QRCode.CorrectLevel.H
	});

	socket.on('update', function(data) {
		var color = data.led;
		$('#' + color).data('on', !$('#' + color).data('on'));
		update(color);
	});

	socket.on('img', function(data) {
		var image64 = data.src;
		$('#vid').attr('src', 'data:image/jpeg;base64,' + image64);
	});

	$.get('/status').done(function(data) {
		$('#green').data('on', data.green);
		update('green');
		$('#yellow').data('on', data.yellow);
		update('yellow');
		$('#red').data('on', data.red);
		update('red');
	});

	$('#green').click(function() {
		$('#green').data('on', !$('#green').data('on'));
		update('green');
		socket.emit('green');
	});

	$('#yellow').click(function() {
		$('#yellow').data('on', !$('#yellow').data('on'));
		update('yellow');
		socket.emit('yellow');
	});

	$('#red').click(function() {
		$('#red').data('on', !$('#red').data('on'));
		update('red');
		socket.emit('red');
	});

	var update = function(color) {
		console.log(color);
		var status = $('#' + color + 'Status');
		var btn = $('#' + color);
		if (btn.data('on')) {
			status.html('On');
			btn.html('Turn off the led');
			btn.removeClass('btn-success');
			btn.addClass('btn-danger');
		}
		else {
			status.html('Off');
			btn.html('Turn on the led');
			btn.removeClass('btn-danger');
			btn.addClass('btn-success');
		}
	};
})();