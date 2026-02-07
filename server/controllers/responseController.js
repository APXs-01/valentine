const Response = require('../models/Response');

// Create new user session
exports.createUser = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Name is required' });
        }

        const newResponse = new Response({
            name: name.trim(),
            screenResponses: []
        });

        await newResponse.save();

        res.status(201).json({
            success: true,
            message: 'User session created',
            userId: newResponse._id
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Save button click (Yes/No)
exports.saveResponse = async (req, res) => {
    try {
        const { userId, screenNumber, response } = req.body;

        const userResponse = await Response.findById(userId);
        
        if (!userResponse) {
            return res.status(404).json({ error: 'User not found' });
        }

        userResponse.screenResponses.push({
            screenNumber,
            response,
            timestamp: new Date()
        });

        await userResponse.save();

        res.status(200).json({
            success: true,
            message: 'Response saved'
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Mark as completed (celebration)
exports.completeCelebration = async (req, res) => {
    try {
        const { userId } = req.body;

        const userResponse = await Response.findById(userId);
        
        if (!userResponse) {
            return res.status(404).json({ error: 'User not found' });
        }

        userResponse.finalResponse = 'Celebrating';
        userResponse.completedAt = new Date();

        await userResponse.save();

        res.status(200).json({
            success: true,
            message: 'Celebration completed'
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get all responses (for admin/analytics)
exports.getAllResponses = async (req, res) => {
    try {
        const responses = await Response.find().sort({ createdAt: -1 });

        // Calculate statistics
        const totalUsers = responses.length;
        const completedUsers = responses.filter(r => r.completedAt !== null).length;
        
        const yesCount = responses.reduce((count, user) => {
            const yesResponses = user.screenResponses.filter(r => r.response === 'Yes').length;
            return count + yesResponses;
        }, 0);

        const noCount = responses.reduce((count, user) => {
            const noResponses = user.screenResponses.filter(r => r.response === 'No').length;
            return count + noResponses;
        }, 0);

        res.status(200).json({
            success: true,
            statistics: {
                totalUsers,
                completedUsers,
                totalYesClicks: yesCount,
                totalNoClicks: noCount
            },
            responses
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Get single user response
exports.getUserResponse = async (req, res) => {
    try {
        const { userId } = req.params;

        const userResponse = await Response.findById(userId);
        
        if (!userResponse) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};