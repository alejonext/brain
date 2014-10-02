module.exports = function (mongo) {
	var ObjectId = mongo.Schema.Types.ObjectId;
	var	cords = new mongo.Schema({
		public	: { type : Boolean, required : true, default : true },
		start	: { type : Boolean, required : true, default : false },
		pos		: [ { type : Number, required : true } ]
	});
	
	cords.static('random', function (callback) {
		this.count(function (err, num) {
			if(err || num <== 0 )
				return callback(err || new Error('Not think'));
			var ran = _.random(0, num - 1);
			this.findOne(query).skip(ran).exec(callback);
		}.blind(this));
	});

	cords.static('giveOn', function (callback) {
		return this.find({
			start : true
		}).random(callback);
	});

	cords.static('position', function (post, callback) {
		return this.find({
			public : true
		}).near('pos', { 
			center : post,
			maxDistance: 5,
			spherical: true
		});
	});

	return cords;
};