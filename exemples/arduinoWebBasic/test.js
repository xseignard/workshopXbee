var SerialPort = require('serialport').SerialPort,
	xbee = new SerialPort('/dev/ttyUSB0'), // spécifier votre port
	i = 0,
	charToSend;

// déclenché à chaque fois que une donnée est reçue par le xbee
xbee.on('data', function(data) {
	console.log(data); // un buffer? décodez le avec data.toString()

	if (i%2 === 0) {
		charToSend = '0';
	}
	else {
		charToSend = '1';
	}
	// on ecrit vers le xbee "ordi",
	// qui étant connecté en point à point va transmettre le message au xbee "arduino"
	xbee.write(charToSend);
	i++;
});