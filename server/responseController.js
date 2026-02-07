const Response = require('./Response');

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