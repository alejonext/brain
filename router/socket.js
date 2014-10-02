module.exports = function (socket, next){
	socket.db = require(GLOBAL.dir, 'lib').db(master);
	next();
};

module.exports.next = function () {
	var socket = this;
	socket.db.cords.giveOn(function (err, cords){
		if(err) socket.emit('error', err);
		socket.db.url.giveOn(cords.concept, socket.id ,function (err, url) {
			if(err) socket.emit('error', err);
			socket.emit('url', url);
		});
	});
};

module.exports.off = function (data) {
	var socket = this;
	socket.db.url.TrunOff(socket.id, function (err) {
		if(err) socket.emit('error', err);
	});
};

module.exports.disconnect = function () {
	var socket = this;
	socket.db.url.TrunOff(socket.id, function (err, url) {
		if(err) console.error(err);
		socket.db.closeConnection();
	});
};
