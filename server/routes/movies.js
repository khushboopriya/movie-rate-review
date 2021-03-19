const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const RatingsAndReviews = require('../models/ratingsandreviews');
const auth = require('../middlewares/auth');

router.get('/all', (req, res) => {
    Movie.find({})
    .then(movies => {
        res.send(movies);
    })
    .catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.post('/ratingandreview/add', auth.authenticate,(req, res) => {
    const {movieId, review, rating} = req.body;
    const userId = req.session.userId
    const ratingandreview = new RatingsAndReviews({userId, movieId, review, rating});
    
    RatingsAndReviews.updateOne({ userId, movieId }, {review, rating})
    .then((opData) => {
        console.log('opData=', opData);
        if(opData.nModified !== 0)   res.status(201).send({ success: true, userId, movieId, rating, review});
        else {
            ratingandreview.save()
            .then(() => {
                res.status(201).send({ success: true, userId, movieId, rating, review});
            })
            .catch(err => {
                res.status(200).send({ error: "Internal Server Error", err});
            });
        }
    }).catch((err) => {
        res.status(200).send({ error: "Internal Server Error", err});
    });
});

router.get('/ratingandreview/movieId', (req, res) => {
    const {movieId} = req.body;
    RatingsAndReviews.find({movieId})
    .then(data => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(404).send({success: false, err});
    });
});

module.exports = router;