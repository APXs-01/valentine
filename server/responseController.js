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