const express = require('express');
const router = express.Router();

const users = require('./routes/users');
const movies = require('./routes/movies');
const sessions = require('./routes/sessions');

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);

router.use('/movies', movies);

router.use('/sessions', sessions);

module.exports = router;