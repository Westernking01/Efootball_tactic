// Agent 1: Tactical Analyst
// Generates complete tactical setups based on formation, playstyle, and opponent

import { MANAGERS, FORMATION_POSITIONS, PLAYSTYLE_TYPES, IN_POSSESSION, OUT_OF_POSSESSION, PHASE_TRANSFORMATIONS, EFOOTBALL_2026_FEATURES, META_2026 } from '../../../shared/constants.js';

/**
 * Generate a complete tactical setup
 * @param {Object} input - Tactic input parameters
 * @returns {Object} Complete tactic with all settings
 */
export const generateTactic = (input) => {
    const { formation, playstyle, squadLevel, opponentStyle } = input;

    // Select best manager
    const manager = selectManager(playstyle, formation);

    // Generate team settings
    const teamSettings = generateTeamSettings(playstyle, opponentStyle, squadLevel);

    // Generate player roles (general logic for all 11 players)
    const instructions = generatePlayerInstructions(formation, playstyle, squadLevel);

    // Generate specific eFootball Individual Instructions (the 4 slots)
    const individualInstructions = generateIndividualInstructions(formation, playstyle, instructions);

    // Get advanced phase transformation rules
    const phaseRules = PHASE_TRANSFORMATIONS[formation] || {
        inPossession: formation,
        outOfPossession: formation,
        summary: `Standard ${formation} tactical structure.`,
        wideRoles: [],
        halfSpaceRoles: [],
        pivotRoles: [],
        restDefense: []
    };

    // Determine tags
    const tags = determineTags(formation, playstyle, squadLevel);

    // Generate description
    const description = generateDescription(formation, playstyle, opponentStyle);

    return {
        id: generateTacticId(),
        name: `${formation} ${playstyle}`,
        formation,
        teamSettings,
        instructions,
        individualInstructions,
        manager,
        tags,
        description,
        engineSummary: phaseRules.summary,
        decisionTags: {
            base_formation: formation,
            in_possession_shape: phaseRules.inPossession,
            out_of_possession_shape: phaseRules.outOfPossession,
            wide_roles: phaseRules.wideRoles,
            half_space_roles: phaseRules.halfSpaceRoles,
            pivot_roles: phaseRules.pivotRoles,
            rest_defense: phaseRules.restDefense
        },
        createdAt: new Date().toISOString(),
    };
};

const generateIndividualInstructions = (formation, playstyle, instructions) => {
    const slots = [];

    // Find key players
    const strikers = instructions.filter(i => i.position.includes('CF'));
    const dmfs = instructions.filter(i => i.position.includes('DMF'));
    const wingers = instructions.filter(i => ['LWF', 'RWF', 'LMF', 'RMF'].some(w => i.position.includes(w)));
    const fullbacks = instructions.filter(i => ['LB', 'RB', 'LWB', 'RWB'].some(f => i.position.includes(f)));
    const amfs = instructions.filter(i => i.position.includes('AMF'));

    // --- PHASE 1: IN-POSSESSION (OFFENSE SLOTS) ---
    // Slot 1: Primary Offensive Movement
    if (playstyle === 'Possession Game' || playstyle === 'Out Wide') {
        if (wingers.length > 0) {
            slots.push({ slot: 'Offense 1', phase: 'In-Possession', position: wingers[0].position, instruction: 'Anchoring' });
        } else {
            slots.push({ slot: 'Offense 1', phase: 'In-Possession', position: 'Off', instruction: 'Off' });
        }
    } else {
        if (amfs.length > 0) {
            slots.push({ slot: 'Offense 1', phase: 'In-Possession', position: amfs[0].position, instruction: 'Offensive' });
        } else if (fullbacks.length > 0) {
            slots.push({ slot: 'Offense 1', phase: 'In-Possession', position: fullbacks[0].position, instruction: 'Offensive' });
        } else {
            slots.push({ slot: 'Offense 1', phase: 'In-Possession', position: 'Off', instruction: 'Off' });
        }
    }

    // Slot 2: Supplementary Offensive / Holding
    if (dmfs.length > 0) {
        slots.push({ slot: 'Offense 2', phase: 'In-Possession', position: dmfs[0].position, instruction: 'Defensive' });
    } else if (fullbacks.length > 0 && fullbacks.length > 1) {
        slots.push({ slot: 'Offense 2', phase: 'In-Possession', position: fullbacks[1].position, instruction: 'Defensive' });
    } else {
        slots.push({ slot: 'Offense 2', phase: 'In-Possession', position: 'Off', instruction: 'Off' });
    }

    // --- PHASE 2: OUT-OF-POSSESSION (DEFENSE SLOTS) ---
    // Slot 3: Defensive Shield / Marking
    if (strikers.length > 0) {
        slots.push({ slot: 'Defense 1', phase: 'Out-of-Possession', position: strikers[0].position, instruction: 'Counter Target' });
    } else {
        slots.push({ slot: 'Defense 1', phase: 'Out-of-Possession', position: 'Off', instruction: 'Off' });
    }

    // Slot 4: Defensive Line Protection
    if (dmfs.length > 0) {
        slots.push({ slot: 'Defense 2', phase: 'Out-of-Possession', position: dmfs[0].position, instruction: 'Deep Line' });
    } else if (strikers.length > 1) {
        slots.push({ slot: 'Defense 2', phase: 'Out-of-Possession', position: strikers[1].position, instruction: 'Counter Target' });
    } else {
        slots.push({ slot: 'Defense 2', phase: 'Out-of-Possession', position: 'Off', instruction: 'Off' });
    }

    return slots;
};

const selectManager = (playstyle, formation) => {
    const managers = MANAGERS[playstyle] || MANAGERS['Quick Counter'];

    // Find manager with matching formation or use first
    const matchingManager = managers.find(m => m.formation === formation);
    return matchingManager || managers[0];
};

const generateTeamSettings = (playstyle, opponentStyle, squadLevel) => {
    const styleSettings = {
        inPossession: { ...IN_POSSESSION.ATTACKING_STYLES[playstyle] },
        outOfPossession: { ...OUT_OF_POSSESSION.DEFENSIVE_STYLES[playstyle] }
    };

    // Base settings (legacy compatibility)
    const settings = {
        playstyle,
        buildUp: playstyle === 'Quick Counter' ? 'Long Pass' : 'Short Pass',
        attackingArea: styleSettings.inPossession.positionalAttack,
        supportRange: styleSettings.inPossession.supportRange,
        defensiveStyle: styleSettings.outOfPossession.defensiveTactic,
        pressingType: styleSettings.outOfPossession.pressingIntensity,
        defensiveLine: styleSettings.outOfPossession.defensiveLine,
        compactness: styleSettings.outOfPossession.compactness,
        ...styleSettings
    };

    // Adjust based on opponent (Elite Logic: Tweaks without overriding core identity)
    if (opponentStyle === 'Possession') {
        // Against possession, we can sit slightly deeper or press tighter
        settings.outOfPossession.compactness = Math.min(10, settings.outOfPossession.compactness + 1);
    } else if (opponentStyle === 'Counter Attack') {
        // Against counters, ensure we don't over-commit if not intended
        if (playstyle !== 'Quick Counter' && playstyle !== 'Possession Game') {
            settings.outOfPossession.defensiveLine = Math.max(1, settings.outOfPossession.defensiveLine - 1);
        }
    } else if (opponentStyle === 'High Press') {
        // Bypass high press with direct options if needed
        if (settings.inPossession.offensiveTactic !== 'Long Ball') {
            // Optional: could suggest long ball, but let's keep user preference dominant
        }
    }

    // Adjust based on squad level - Elite users get the raw meta settings
    if (squadLevel === 'Beginner') {
        // Beginners need safer, less extreme settings
        settings.outOfPossession.pressingIntensity = 'Conservative';
        settings.outOfPossession.defensiveLine = 5; // Reset to safe medium
        settings.outOfPossession.compactness = 6;
    }

    return settings;
};

export const generatePlayerInstructions = (formation, playstyle, squadLevel) => {
    const positions = FORMATION_POSITIONS[formation];
    const instructions = [];

    positions.forEach(position => {
        // Normalize position code (e.g., LCB -> CB, RAMF -> AMF, LB -> LB)
        // We want to strip the side prefix (L/R/LC/RC) EXCEPT for roles that are side-specific by default
        const sideSpecific = ['LB', 'RB', 'LWB', 'RWB', 'LWF', 'RWF', 'LMF', 'RMF'];
        let normalizedPos = position;

        if (!sideSpecific.includes(position)) {
            normalizedPos = position.replace(/^(L|R|LC|RC|CC)/, '');
            // If we stripped everything (e.g. "CB" -> ""), restore it
            if (!normalizedPos) normalizedPos = position;
        }

        if (normalizedPos === 'GK') {
            instructions.push({
                position: position,
                role: 'Goalkeeper',
                attackingStyle: playstyle === 'Possession Game' ? 'Offensive GK' : 'Defensive GK',
                defensiveEngagement: 'Always',
                advancedInstructions: [],
                reason: playstyle === 'Possession Game'
                    ? 'Offensive GK for better distribution and sweeping'
                    : 'Defensive GK for shot-stopping focus',
            });
        } else if (normalizedPos === 'CB') {
            instructions.push({
                position,
                role: position.includes('LCB') ? 'Left Center Back' : position.includes('RCB') ? 'Right Center Back' : 'Center Back',
                attackingStyle: 'Build Up',
                defensiveEngagement: 'Always',
                advancedInstructions: [],
                reason: 'Build Up allows CBs to initiate attacks while maintaining defensive duties',
            });
        } else if (normalizedPos === 'LB' || normalizedPos === 'RB') {
            const isAttacking = playstyle === 'Out Wide' || playstyle === 'Possession Game';
            instructions.push({
                position,
                role: normalizedPos === 'LB' ? 'Left Back' : 'Right Back',
                attackingStyle: isAttacking ? 'Offensive Fullback' : 'Defensive Fullback',
                defensiveEngagement: 'Always',
                advancedInstructions: isAttacking ? ['Pinpoint Crossing'] : [],
                reason: isAttacking
                    ? 'Offensive fullbacks provide width and crossing options'
                    : 'Defensive fullbacks prioritize defensive stability',
            });
        } else if (normalizedPos === 'LWB' || normalizedPos === 'RWB') {
            instructions.push({
                position,
                role: normalizedPos === 'LWB' ? 'Left Wing Back' : 'Right Wing Back',
                attackingStyle: 'Offensive Fullback',
                defensiveEngagement: 'Always',
                advancedInstructions: ['Pinpoint Crossing'],
                reason: 'Wingbacks must cover entire flank - high stamina required (85+)',
            });
        } else if (normalizedPos === 'DMF') {
            const dmfCount = positions.filter(p => p.includes('DMF')).length;
            const dmfIndex = instructions.filter(i => i.position.includes('DMF')).length;

            let style = 'Anchor Man';
            if (playstyle === 'Quick Counter') style = dmfCount > 1 && dmfIndex === 0 ? 'Anchor Man' : 'Destroyer';
            if (playstyle === 'Possession Game') style = dmfCount > 1 && dmfIndex === 0 ? 'Orchestrator' : 'Anchor Man';
            if (playstyle === 'Long Ball Counter') style = 'Anchor Man';
            if (playstyle === 'Long Ball') style = 'Destroyer';

            instructions.push({
                position: position,
                role: 'Defensive Midfielder',
                attackingStyle: style,
                defensiveEngagement: 'Always',
                advancedInstructions: [],
                reason: `${style} provides the necessary ${style === 'Anchor Man' ? 'protection' : style === 'Destroyer' ? 'aggression' : 'ball distribution'} for ${playstyle}`,
            });
        } else if (normalizedPos === 'CMF') {
            const cmfIndex = instructions.filter(i => i.position.includes('CMF')).length;
            let style = 'Box-to-Box';
            if (playstyle === 'Possession Game') style = cmfIndex === 0 ? 'Orchestrator' : 'Hole Player';
            if (playstyle === 'Out Wide') style = 'Box-to-Box';
            if (playstyle === 'Quick Counter') style = 'Box-to-Box';

            instructions.push({
                position: position,
                role: 'Central Midfielder',
                attackingStyle: style,
                defensiveEngagement: 'Always',
                advancedInstructions: [],
                reason: `${style} provides the balance required in this ${playstyle} setup`,
            });
        } else if (normalizedPos === 'LMF' || normalizedPos === 'RMF') {
            let style = 'Prolific Winger';
            if (playstyle === 'Out Wide') style = 'Cross Specialist';
            if (playstyle === 'Quick Counter') style = 'Roaming Flank';
            if (playstyle === 'Possession Game') style = 'Roaming Flank';

            instructions.push({
                position,
                role: normalizedPos === 'LMF' ? 'Left Midfielder' : 'Right Midfielder',
                attackingStyle: style,
                defensiveEngagement: 'Always',
                advancedInstructions: style === 'Cross Specialist' ? ['Pinpoint Crossing'] : [],
                reason: `${style} optimized for ${playstyle} wing play`,
            });
        } else if (normalizedPos === 'AMF') {
            let style = 'Hole Player';
            if (playstyle === 'Possession Game') style = 'Creative Playmaker';
            if (playstyle === 'Quick Counter') style = 'Hole Player';
            if (playstyle === 'Long Ball') style = 'Classic No.10';

            instructions.push({
                position: position,
                role: 'Attacking Midfielder',
                attackingStyle: style,
                defensiveEngagement: 'None',
                advancedInstructions: [],
                reason: `${style} is the creative engine for this ${playstyle} formation`,
            });
        } else if (normalizedPos === 'LWF' || normalizedPos === 'RWF') {
            let style = 'Prolific Winger';
            if (playstyle === 'Out Wide') style = 'Cross Specialist';
            if (playstyle === 'Possession Game') style = 'Roaming Flank';

            instructions.push({
                position,
                role: normalizedPos === 'LWF' ? 'Left Winger' : 'Right Winger',
                attackingStyle: style,
                defensiveEngagement: 'None',
                advancedInstructions: style === 'Prolific Winger' ? ['Cut Inside'] : ['Pinpoint Crossing'],
                reason: `${style} provides the wide threat for ${playstyle}`,
            });
        } else if (normalizedPos === 'SS') {
            instructions.push({
                position,
                role: position.includes('SS') ? (position.includes('L') ? 'Left Second Striker' : position.includes('R') ? 'Right Second Striker' : 'Second Striker') : 'Second Striker',
                attackingStyle: 'Deep-Lying Forward',
                defensiveEngagement: 'None',
                advancedInstructions: [],
                reason: 'Deep-Lying Forward drops into midfield to link play',
            });
        } else if (normalizedPos === 'CF') {
            const cfCount = positions.filter(p => p.includes('CF')).length;
            const cfIndex = instructions.filter(i => i.position.includes('CF')).length;

            let style = 'Goal Poacher';
            if (playstyle === 'Long Ball') style = 'Target Man';
            if (playstyle === 'Possession Game') style = 'Fox in the Box';
            if (playstyle === 'Out Wide') style = 'Target Man';

            instructions.push({
                position: position,
                role: 'Center Forward',
                attackingStyle: cfCount > 1 && cfIndex === 1 ? 'Goal Poacher' : style,
                defensiveEngagement: 'None',
                advancedInstructions: [],
                reason: `${style} is the focal point for ${playstyle} attacks`,
            });
        }
    });

    return instructions;
};

const determineTags = (formation, playstyle, squadLevel) => {
    const tags = [];

    // Squad level tag
    tags.push(squadLevel.toUpperCase());

    // Playstyle tags
    if (playstyle === 'Quick Counter' || playstyle === 'Long Ball Counter') {
        tags.push('DEFENSIVE');
    } else if (playstyle === 'Out Wide') {
        tags.push('ATTACKING');
    } else {
        tags.push('BALANCED');
    }

    // 2026 Meta formations
    const metaFormations = ['4-2-1-3', '3-4-2-1', '4-1-2-3', '5-2-1-2', '4-3-3', '4-2-3-1'];
    if (metaFormations.includes(formation)) {
        tags.push('META');
    }

    return tags;
};

const generateDescription = (formation, playstyle, opponentStyle) => {
    return `${formation} formation optimized for ${playstyle} against ${opponentStyle} opponents. Balanced tactical setup suitable for eFootball Mobile.`;
};

const generateTacticId = () => {
    return `tactic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
