import { body, validationResult } from 'express-validator';
import { FORMATIONS, PLAYSTYLES, SQUAD_LEVELS, OPPONENT_STYLES } from '../../shared/constants.js';

export const validateTacticInput = [
    body('formation')
        .isString()
        .isIn(FORMATIONS)
        .withMessage('Invalid formation'),
    body('playstyle')
        .isString()
        .isIn(PLAYSTYLES)
        .withMessage('Invalid playstyle'),
    body('squadLevel')
        .isString()
        .isIn(SQUAD_LEVELS)
        .withMessage('Invalid squad level'),
    body('opponentStyle')
        .isString()
        .isIn(OPPONENT_STYLES)
        .withMessage('Invalid opponent style'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const sanitizeInput = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        });
    }
    next();
};
