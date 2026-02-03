import { getCoachResponse } from '../services/ai/chatCoach.js';
import { AppError } from '../middleware/errorHandler.js';

export const handleChat = async (req, res, next) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            throw new AppError('Message is required', 400);
        }

        const response = await getCoachResponse(message, history || []);

        res.json({
            response,
            role: 'coach',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
};
