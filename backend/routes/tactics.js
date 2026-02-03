import express from 'express';
import {
    generateTacticController,
    validateTacticController,
    getPresetsController,
    getPresetByIdController,
} from '../controllers/tacticsController.js';
import { validateTacticInput, sanitizeInput } from '../middleware/validator.js';
import { tacticsGeneratorLimiter, generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply general rate limiter to all routes
router.use(generalLimiter);

// Generate tactic
router.post(
    '/generate',
    tacticsGeneratorLimiter,
    sanitizeInput,
    validateTacticInput,
    generateTacticController
);

// Validate tactic
router.post('/validate', sanitizeInput, validateTacticController);

// Get presets list
router.get('/presets', getPresetsController);

// Get specific preset
router.get('/presets/:id', getPresetByIdController);

export default router;
