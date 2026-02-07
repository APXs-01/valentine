const express = require('express');
const router = express.Router();
const responseController = require('../responseController');

// POST: Create new user session
router.post('/create-user', responseController.createUser);

// POST: Save button click response
router.post('/save-response', responseController.saveResponse);

// POST: Mark celebration as completed
router.post('/complete', responseController.completeCelebration);

// GET: Get all responses (analytics)
router.get('/all', responseController.getAllResponses);

// GET: Get single user response
router.get('/user/:userId', responseController.getUserResponse);

module.exports = router;