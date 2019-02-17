exports = module.exports = function(app, mongoose) {

	var hotelSchema = new mongoose.Schema({
        id:          { type: String },
				name:        { type: String },
				stars:       { type: Number },
				price:       { type: Number },
				image:       { type: String },
        amenities:   { type: Array }
   	});

	mongoose.model('hotel', hotelSchema);
};
