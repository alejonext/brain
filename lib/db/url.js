
module.exports = function (mongo) {
	var ObjectId = mongo.Schema.Types.ObjectId;
	var	url = new mongo.Schema({
		public	: { type : Boolean, required : true, default : true },
		concept	: { type : ObjectId, ref: 'item', required : true, index : true },
		user	: { type : String },
		url		: { type : String, required : true, unique : true },
		inter	: { type : Number, required : true }
	});

	url.static('giveOn', function (concept, user, inter, callback) {
		var query = {
			user : ,

		};
		this.findOneAndUpdate(query,{
			user : user
		}, callback);
	});

	url.static('TrunOff', function (user, callback) {
		this.findAndUpdate({
			user : user
		},{
			user : null
		}, callback);
	});

	return url;
};