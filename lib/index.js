



module.exports.connect = function (master) {
	var connect = require(__dirname, 'db');
	return new connect(master);
};


