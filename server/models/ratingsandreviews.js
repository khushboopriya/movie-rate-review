const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingsandreviewsSchema = new Schema({
    movieId: String,
    userId: String,
    review: String,
    rating: Number 
});

module.exports = mongoose.model('RatingsAndReviews', ratingsandreviewsSchema);