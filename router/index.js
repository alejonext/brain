// Server

module.exports = function (master) {
	const express = require('express');
	const router = require('./socket.js');	

	var app = express();
	var server = require('http').Server(app);
	var io = require('socket.io')( server );

	server.listen(master.port);

	app.set('view engine', 'jade');
	app.set('views', GLOBAL.path.join(GLOBAL.dir, 'public', 'views'));
	//app.enable('view cache');
	app.use('/public', express.static(GLOBAL.path.join(GLOBAL.dir, 'public')));

	app.all('/:path?', function (req, res) {
		var is = !req.params.path ? 'home' : req.params.path;
		res.render(is);
	});
	io.use(router);
	io.on('connection', function (socket) {
		socket.emit('test', 'ok');
		socket.on('next', router.next);
		socket.on('delete', router.off);
		socket.on('disconnect', router.disconnect);
	});
};