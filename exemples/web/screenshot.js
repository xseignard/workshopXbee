var spawn = require('child_process').spawn,
	util = require('util'),
	uuid = require('node-uuid'),
	events = require('events'),
	fs = require('fs');

var location = '/tmp/screenshot/';

fs.mkdir(location, 0777);

var Screenshot = function(opts) {
	this.frequency = opts.frequency;
	this.device = opts.device;
	this.quality = opts.quality;
};

util.inherits(Screenshot, events.EventEmitter);

Screenshot.prototype.grab = function(callback) {

	var grabber = function() {
		var self = this;
		var file = location + uuid() + '.jpeg';
		var args = ['-c', this.device, '-j', this.quality, '-o', file];

		var streamer = spawn('streamer', args);
		streamer.on('exit', function(code) {
			fs.exists(file, function (exists) {
				if (!exists) {
					var err = new Error('Frame file unavailable.');
					self.emit('error', err);
					if (callback) {
						callback.call(err);
					}
				}
				else {
					fs.readFile(file, function (err, data) {

						if (err) {
							self.emit('error', err);
							if (callback) {
								callback.call(err);
							}
						}
						else {
							self.emit('frame', data);
							fs.unlink(file);
							if (callback) {
								callback(data);
							}
						}
					});
				}
			});
		});
	};
	setInterval(function (self) {
		grabber.apply(self);
    }, 1000 * this.frequency, this);
};

module.exports = Screenshot;