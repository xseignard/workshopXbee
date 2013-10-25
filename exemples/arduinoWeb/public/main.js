(function() {
	$(document).ready(function() {
		// connect to the websocket server
		var socket = io.connect('http://82.235.243.114/'),
			// instanciate a chart with some styling
			smoothie = new SmoothieChart({
  				grid: {
  					strokeStyle:'rgb(125, 0, 0)',
  					fillStyle:'rgb(60, 0, 0)',
          			lineWidth: 1,
          			millisPerLine: 250,
          			verticalSections: 6
          		},
  				labels: {
  					fillStyle:'rgb(60, 0, 0)'
  				}
			}),
			// create the time serie that will handle the photocell values
			photocellSerie = new TimeSeries();

		// display data in the #chart element
		smoothie.streamTo($('#chart')[0], 1000);
		// when a new value arrives, add it to the time serie
		socket.on('value', function(data) {
			console.log(data.cell);
			photocellSerie.append(new Date().getTime(), data.cell);
		});
		// link the time serie to its graph, with style
		smoothie.addTimeSeries(photocellSerie, {
			strokeStyle: 'rgb(0, 255, 0)',
			fillStyle: 'rgba(0, 255, 0, 0.4)',
			lineWidth: 3
		});
	});
})();