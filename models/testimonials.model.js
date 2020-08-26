const mongoose = require('mongoose');
const testimonialModel = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('Testimonial', testimonialModel); 