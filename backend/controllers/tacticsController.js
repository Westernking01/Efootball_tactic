import { generateTactic, generatePlayerInstructions } from '../services/ai/tacticalAnalyst.js';
import { validateTactic } from '../services/ai/rulesValidator.js';
import { generateBoardData } from '../services/ai/formationMapper.js';
import { generateExplanation } from '../services/ai/explainer.js';
import { getCachedTactic, setCachedTactic, generateCacheKey } from '../services/cache.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Generate a complete tactic based on user input
 */
export const generateTacticController = async (req, res, next) => {
    try {
        const { formation, playstyle, squadLevel, opponentStyle, individualInstructions, teamSettings } = req.body;

        // Check cache first (skip if custom instructions are provided)
        const cacheKey = generateCacheKey(req.body);
        const cachedTactic = !individualInstructions ? getCachedTactic(cacheKey) : null;

        if (cachedTactic) {
            console.log('✅ Returning cached tactic');
            return res.json({
                ...cachedTactic,
                cached: true,
            });
        }

        // Generate new tactic or use provided setup
        console.log(`🎯 Processing tactic: ${formation} - ${playstyle}`);
        let tactic;

        if (individualInstructions) {
            // If instructions are provided, we build a complete tactic object for board generation
            const baseInstructions = generatePlayerInstructions(formation, playstyle, squadLevel || 'Medium');
            tactic = {
                formation,
                playstyle,
                teamSettings: teamSettings || {
                    offensiveStyle: playstyle,
                    defensiveStyle: 'Balanced',
                    compactness: 50,
                    lineHeight: 50
                },
                instructions: baseInstructions,
                individualInstructions
            };
        } else {
            tactic = generateTactic({ formation, playstyle, squadLevel, opponentStyle });
        }

        // Generate board data
        const boardData = generateBoardData(formation, tactic.teamSettings, tactic.individualInstructions);
        tactic.boardData = boardData;

        // Generate explanation (only if we generated a fresh tactic)
        if (!individualInstructions) {
            const explanation = generateExplanation(tactic, (squadLevel || 'medium').toLowerCase());
            tactic.explanation = explanation;
        }

        // Add validation results
        const validation = validateTactic(tactic);
        tactic.validation = validation;

        // Cache the result
        setCachedTactic(cacheKey, tactic);

        res.json({
            ...tactic,
            cached: false,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Validate a tactic
 */
export const validateTacticController = async (req, res, next) => {
    try {
        const tactic = req.body;

        if (!tactic.formation || !tactic.teamSettings || !tactic.instructions) {
            throw new AppError('Invalid tactic format', 400);
        }

        const validation = validateTactic(tactic);

        res.json(validation);
    } catch (error) {
        next(error);
    }
};

/**
 * Get preset tactics
 */
export const getPresetsController = async (req, res, next) => {
    try {
        const presets = [
            // Quick Counter
            { id: 'qc_meta_1', name: 'QC: 4-2-4 Overload', formation: '4-2-4', playstyle: 'Quick Counter', tags: ['META', 'ATTACKING'], description: 'Aggressive 4-forward overload. Suggested: Xabi Alonso (88 QC) with Link-up Play enabled.' },
            { id: 'qc_meta_2', name: 'QC: 4-2-1-3 Meta', formation: '4-2-1-3', playstyle: 'Quick Counter', tags: ['META', 'BALANCED'], description: 'The current Division 1 meta. Suggested: Xabi Alonso (88 QC) or G. Gasperini (88 QC).' },
            { id: 'qc_meta_3', name: 'QC: 4-2-2-2 Narrow', formation: '4-2-2-2', playstyle: 'Quick Counter', tags: ['META', 'BALANCED'], description: 'Narrow passing lanes. Suggested: G. Gasperini (88 QC) with physical contact boost.' },

            // Possession Game
            { id: 'pos_meta_1', name: 'POS: 4-1-2-3 Control', formation: '4-1-2-3', playstyle: 'Possession Game', tags: ['META', 'ATTACKING'], description: 'Hyper-offensive possession. Suggested: Hansi Flick (88 POS) with Link-up Play synergy.' },
            { id: 'pos_meta_2', name: 'POS: 4-3-3 Classic', formation: '4-3-3', playstyle: 'Possession Game', tags: ['META', 'BALANCED'], description: 'Pure lane control. Suggested: Pep Guardiola (88 POS) for technique boost.' },
            { id: 'pos_meta_3', name: 'POS: 3-2-2-3 Box', formation: '3-2-2-3', playstyle: 'Possession Game', tags: ['META', 'DEFENSIVE'], description: 'Superior midfield overload. Suggested: Hansi Flick (88 POS) with Link-up Play.' },

            // Out Wide
            { id: 'ow_meta_1', name: 'OW: 3-4-3 Diamond', formation: '3-4-3', playstyle: 'Out Wide', tags: ['META', 'ATTACKING'], description: 'Total wing dominance. Suggested: S. Solbakken (89 OW) with heading boost.' },
            { id: 'ow_meta_2', name: 'OW: 4-4-2 Wide Cross', formation: '4-4-2', playstyle: 'Out Wide', tags: ['META', 'BALANCED'], description: 'Classic wing play. Suggested: S. Solbakken (89 OW) and Link-up Play synergy.' },
            { id: 'ow_meta_3', name: 'OW: 5-2-3 Surge', formation: '5-2-3', playstyle: 'Out Wide', tags: ['META', 'DEFENSIVE'], description: 'Deep security + WB. Suggested: Jose Mourinho (88 OW) for defensive stability.' },

            // Long Ball Counter
            { id: 'lbc_meta_1', name: 'LBC: 4-2-1-3 Direct', formation: '4-2-1-3', playstyle: 'Long Ball Counter', tags: ['META', 'ATTACKING'], description: 'Lethal transitions. Suggested: L. Spalletti (89 LBC) with Link-up Play synergy.' },
            { id: 'lbc_meta_2', name: 'LBC: 4-2-2-2 Fortress', formation: '4-2-2-2', playstyle: 'Long Ball Counter', tags: ['META', 'BALANCED'], description: 'Two-line block. Suggested: L. Spalletti (89 LBC) or S. Inzaghi (88 LBC).' },
            { id: 'lbc_meta_3', name: 'LBC: 5-2-1-2 Low Block', formation: '5-2-1-2', playstyle: 'Long Ball Counter', tags: ['META', 'DEFENSIVE'], description: 'Park the Bus meta. Suggested: S. Inzaghi (88 LBC) with Speed & Finishing boost.' },

            // Long Ball
            { id: 'lb_meta_1', name: 'LB: 4-4-2 Target Man', formation: '4-4-2', playstyle: 'Long Ball', tags: ['META', 'ATTACKING'], description: 'Direct pressure. Suggested: G. Southgate (82 LB) for systematic long ball play.' },
            { id: 'lb_meta_2', name: 'LB: 4-2-3-1 Direct', formation: '4-2-3-1', playstyle: 'Long Ball', tags: ['META', 'BALANCED'], description: 'Systematic direct play. Using AMF for knock-downs. Suggested: G. Southgate.' },
            { id: 'lb_meta_3', name: 'LB: 3-5-2 Route One', formation: '3-5-2', playstyle: 'Long Ball', tags: ['META', 'DEFENSIVE'], description: 'Defensive density with direct outlets. Suggested: G. Southgate (82 LB).' },

            { id: 'preset_1', name: '4-3-3 Possession Master', formation: '4-3-3', playstyle: 'Possession Game', tags: ['BEGINNER', 'BALANCED'], description: 'Classic possession-based 4-3-3 for controlling the game' },
            { id: 'preset_2', name: '5-2-1-2 Counter Attack', formation: '5-2-1-2', playstyle: 'Quick Counter', tags: ['BEGINNER', 'DEFENSIVE'], description: 'Solid defensive setup perfect for counter-attacking' },
        ];

        res.json(presets);
    } catch (error) {
        next(error);
    }
};

/**
 * Get full preset tactic by ID
 */
export const getPresetByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Map preset IDs to tactic inputs
        const presetInputs = {
            // Quick Counter
            qc_meta_1: { formation: '4-2-4', playstyle: 'Quick Counter', squadLevel: 'Advanced', opponentStyle: 'Possession' },
            qc_meta_2: { formation: '4-2-1-3', playstyle: 'Quick Counter', squadLevel: 'Advanced', opponentStyle: 'Counter Attack' },
            qc_meta_3: { formation: '4-2-2-2', playstyle: 'Quick Counter', squadLevel: 'Advanced', opponentStyle: 'High Press' },

            // Possession Game
            pos_meta_1: { formation: '4-1-2-3', playstyle: 'Possession Game', squadLevel: 'Advanced', opponentStyle: 'Counter Attack' },
            pos_meta_2: { formation: '4-3-3', playstyle: 'Possession Game', squadLevel: 'Advanced', opponentStyle: 'High Press' },
            pos_meta_3: { formation: '3-2-2-3', playstyle: 'Possession Game', squadLevel: 'Advanced', opponentStyle: 'Possession' },

            // Out Wide
            ow_meta_1: { formation: '3-4-3', playstyle: 'Out Wide', squadLevel: 'Advanced', opponentStyle: 'Possession' },
            ow_meta_2: { formation: '4-4-2', playstyle: 'Out Wide', squadLevel: 'Advanced', opponentStyle: 'Counter Attack' },
            ow_meta_3: { formation: '5-2-3', playstyle: 'Out Wide', squadLevel: 'Advanced', opponentStyle: 'High Press' },

            // Long Ball Counter
            lbc_meta_1: { formation: '4-2-1-3', playstyle: 'Long Ball Counter', squadLevel: 'Advanced', opponentStyle: 'Possession' },
            lbc_meta_2: { formation: '4-2-2-2', playstyle: 'Long Ball Counter', squadLevel: 'Advanced', opponentStyle: 'Counter Attack' },
            lbc_meta_3: { formation: '5-2-1-2', playstyle: 'Long Ball Counter', squadLevel: 'Advanced', opponentStyle: 'High Press' },

            // Long Ball
            lb_meta_1: { formation: '4-4-2', playstyle: 'Long Ball', squadLevel: 'Advanced', opponentStyle: 'Possession' },
            lb_meta_2: { formation: '4-2-3-1', playstyle: 'Long Ball', squadLevel: 'Advanced', opponentStyle: 'Counter Attack' },
            lb_meta_3: { formation: '3-5-2', playstyle: 'Long Ball', squadLevel: 'Advanced', opponentStyle: 'High Press' },

            preset_1: { formation: '4-3-3', playstyle: 'Possession Game', squadLevel: 'Advanced', opponentStyle: 'Counter Attack' },
            preset_2: { formation: '5-2-1-2', playstyle: 'Quick Counter', squadLevel: 'Medium', opponentStyle: 'Possession' },
        };

        const input = presetInputs[id];
        if (!input) {
            throw new AppError('Preset not found', 404);
        }

        // Generate tactic for preset
        const tactic = generateTactic(input);
        const boardData = generateBoardData(input.formation, tactic.teamSettings);
        const explanation = generateExplanation(tactic, input.squadLevel.toLowerCase());
        const validation = validateTactic(tactic);

        tactic.boardData = boardData;
        tactic.explanation = explanation;
        tactic.validation = validation;

        res.json(tactic);
    } catch (error) {
        next(error);
    }
};
