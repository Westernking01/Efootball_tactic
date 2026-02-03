// Agent 4: Explainer
// Generates beginner-friendly explanations for tactics

/**
 * Generate user-friendly explanation for a tactic
 * @param {Object} tactic - Complete tactic object
 * @param {string} targetAudience - 'beginner', 'intermediate', or 'advanced'
 * @returns {Object} Explanation with sections
 */
export const generateExplanation = (tactic, targetAudience = 'beginner') => {
    const { formation, teamSettings, instructions, manager } = tactic;

    return {
        overview: generateOverview(formation, teamSettings, targetAudience),
        howToPlay: generateHowToPlay(teamSettings, targetAudience),
        keyPlayers: generateKeyPlayers(instructions, targetAudience),
        strengths: generateStrengths(formation, teamSettings),
        weaknesses: generateWeaknesses(formation, teamSettings),
        tips: generateTips(teamSettings, targetAudience),
        managerExplanation: generateManagerExplanation(manager),
    };
};

const generateOverview = (formation, teamSettings, audience) => {
    const playstyle = teamSettings.playstyle;

    if (audience === 'beginner') {
        return `This ${formation} formation uses ${playstyle} tactics. It's designed to ${getPlaystyleDescription(playstyle)}. Perfect for players who want a ${getPlaystyleSimplified(playstyle)} approach.`;
    }

    return `${formation} formation optimized for ${playstyle}. Defensive line: ${teamSettings.defensiveLine}/10, Compactness: ${teamSettings.compactness}/10. Build-up through ${teamSettings.buildUp.toLowerCase()}, attacking via ${teamSettings.attackingArea.toLowerCase()} areas.`;
};

const getPlaystyleDescription = (playstyle) => {
    const descriptions = {
        'Quick Counter': 'defend solidly and attack quickly when you win the ball',
        'Possession Game': 'keep the ball and control the game through passing',
        'Long Ball Counter': 'defend deep and launch long balls to your attackers',
        'Out Wide': 'attack through the wings with crosses and wide play',
    };
    return descriptions[playstyle] || 'play balanced football';
};

const getPlaystyleSimplified = (playstyle) => {
    const simplified = {
        'Quick Counter': 'defensive and counter-attacking',
        'Possession Game': 'patient and possession-based',
        'Long Ball Counter': 'direct and physical',
        'Out Wide': 'wing-focused and crossing',
    };
    return simplified[playstyle] || 'balanced';
};

const generateHowToPlay = (teamSettings, audience) => {
    const steps = [];

    if (teamSettings.playstyle === 'Quick Counter') {
        steps.push('1. Defend deep and stay compact');
        steps.push('2. Win the ball in midfield or defense');
        steps.push('3. Immediately pass forward to attackers');
        steps.push('4. Sprint forward with fast players');
        steps.push('5. Finish quickly before opponent recovers');
    } else if (teamSettings.playstyle === 'Possession Game') {
        steps.push('1. Keep possession with short passes');
        steps.push('2. Move the ball patiently');
        steps.push('3. Wait for gaps in opponent defense');
        steps.push('4. Create chances through passing combinations');
        steps.push('5. Maintain shape when you lose the ball');
    } else if (teamSettings.playstyle === 'Long Ball Counter') {
        steps.push('1. Defend deep with all players behind the ball');
        steps.push('2. Win aerial duels and clearances');
        steps.push('3. Launch long balls to tall strikers');
        steps.push('4. Support striker with midfield runs');
        steps.push('5. Use physicality to hold up play');
    } else if (teamSettings.playstyle === 'Out Wide') {
        steps.push('1. Spread play to the wings');
        steps.push('2. Use fullbacks and wingers for width');
        steps.push('3. Deliver crosses into the box');
        steps.push('4. Attack with overlapping runs');
        steps.push('5. Switch play when one side is blocked');
    }

    return steps.join('\n');
};

const generateKeyPlayers = (instructions, audience) => {
    const keyPositions = [];

    // Find most important positions
    const strikers = instructions.filter(i => i.position === 'CF');
    const amfs = instructions.filter(i => i.position === 'AMF');
    const dmfs = instructions.filter(i => i.position === 'DMF');
    const wingbacks = instructions.filter(i => i.position === 'LWB' || i.position === 'RWB');

    if (strikers.length > 0) {
        keyPositions.push({
            position: 'Striker(s)',
            importance: 'Critical for finishing chances',
            requirements: 'High Finishing (85+), Speed (80+), Offensive Awareness (85+)',
        });
    }

    if (amfs.length > 0) {
        keyPositions.push({
            position: 'Attacking Midfielder',
            importance: 'Links midfield to attack',
            requirements: 'High Passing (85+), Dribbling (80+), Offensive Awareness (85+)',
        });
    }

    if (dmfs.length > 0) {
        keyPositions.push({
            position: 'Defensive Midfielder(s)',
            importance: 'Shields defense and starts attacks',
            requirements: 'High Defensive Awareness (85+), Stamina (80+), Physical Contact (80+)',
        });
    }

    if (wingbacks.length > 0) {
        keyPositions.push({
            position: 'Wingbacks',
            importance: 'Must cover entire flank - CRITICAL stamina requirement',
            requirements: 'High Stamina (85+), Speed (80+), Defensive Awareness (75+)',
        });
    }

    return keyPositions;
};

const generateStrengths = (formation, teamSettings) => {
    const strengths = [];

    if (teamSettings.playstyle === 'Quick Counter') {
        strengths.push('Solid defensive structure');
        strengths.push('Deadly on counter-attacks');
        strengths.push('Conserves stamina effectively');
        strengths.push('Great against possession teams');
    } else if (teamSettings.playstyle === 'Possession Game') {
        strengths.push('Controls the game tempo');
        strengths.push('Frustrates opponents');
        strengths.push('Creates many chances');
        strengths.push('Limits opponent attacks');
    } else if (teamSettings.playstyle === 'Long Ball Counter') {
        strengths.push('Bypasses opponent press');
        strengths.push('Effective with tall strikers');
        strengths.push('Simple and direct');
        strengths.push('Good for lower-rated squads');
    } else if (teamSettings.playstyle === 'Out Wide') {
        strengths.push('Stretches opponent defense');
        strengths.push('Creates crossing opportunities');
        strengths.push('Exploits weak fullbacks');
        strengths.push('Exciting attacking play');
    }

    return strengths;
};

const generateWeaknesses = (formation, teamSettings) => {
    const weaknesses = [];

    if (teamSettings.playstyle === 'Quick Counter') {
        weaknesses.push('Struggles against deep defenses');
        weaknesses.push('Requires opponent to attack');
        weaknesses.push('Wingbacks need high stamina');
        weaknesses.push('Can be passive if counters fail');
    } else if (teamSettings.playstyle === 'Possession Game') {
        weaknesses.push('Vulnerable to counter-attacks');
        weaknesses.push('Requires skilled passers');
        weaknesses.push('Can be frustrating if not working');
        weaknesses.push('Needs patient gameplay');
    } else if (teamSettings.playstyle === 'Long Ball Counter') {
        weaknesses.push('Predictable tactics');
        weaknesses.push('Requires tall, physical strikers');
        weaknesses.push('Less effective against deep defenses');
        weaknesses.push('Limited creativity');
    } else if (teamSettings.playstyle === 'Out Wide') {
        weaknesses.push('Exposed to counter-attacks centrally');
        weaknesses.push('Requires good crossers');
        weaknesses.push('Can be stopped by compact defenses');
        weaknesses.push('Fullbacks tire quickly');
    }

    return weaknesses;
};

const generateTips = (teamSettings, audience) => {
    const tips = [];

    // Mobile-specific tips
    tips.push('💡 Set auto-switch to Semi-Assisted for better control');
    tips.push('💡 Save stamina - only dash on important runs');
    tips.push('💡 Make substitutions around 60-65 minutes for wingbacks/fullbacks');

    // Playstyle-specific tips
    if (teamSettings.playstyle === 'Quick Counter') {
        tips.push('💡 Stay patient - let opponent come to you');
        tips.push('💡 Use through balls (double-tap) for quick counters');
    } else if (teamSettings.playstyle === 'Possession Game') {
        tips.push('💡 Use L1/LB for player runs');
        tips.push('💡 Don\'t force passes - keep possession');
    } else if (teamSettings.playstyle === 'Out Wide') {
        tips.push('💡 Use R1/RB for teammate runs');
        tips.push('💡 Cross early before defense recovers');
    }

    return tips;
};

const generateManagerExplanation = (manager) => {
    return `${manager.name} (Management Skill: ${manager.skill}) is recommended for this tactic. This manager specializes in ${manager.formation} formation and provides the tactical flexibility needed for this setup.`;
};

/**
 * Generate simple explanation for a specific setting
 * @param {string} setting - Setting name
 * @param {any} value - Setting value
 * @returns {string} Explanation
 */
export const explainSetting = (setting, value) => {
    const explanations = {
        defensiveLine: {
            low: 'Deep defensive line (1-4): Protects against through balls, sits back',
            medium: 'Medium defensive line (5-6): Balanced positioning',
            high: 'High defensive line (7-10): Presses high, risks through balls',
        },
        compactness: {
            low: 'Low compactness (1-4): Spread out, covers more space',
            medium: 'Medium compactness (5-7): Balanced spacing',
            high: 'High compactness (8-10): Very tight, closes passing lanes',
        },
        buildUp: {
            'Short Pass': 'Build from back with short passes - safer but slower',
            'Long Pass': 'Direct long balls forward - faster but riskier',
            'Mixed': 'Combination of short and long passes - flexible',
        },
        attackingArea: {
            'Center': 'Attack through the middle - more direct',
            'Wide': 'Attack through wings - more crosses',
            'Flexible': 'Attack from anywhere - most balanced',
        },
    };

    if (setting === 'defensiveLine') {
        if (value <= 4) return explanations.defensiveLine.low;
        if (value <= 6) return explanations.defensiveLine.medium;
        return explanations.defensiveLine.high;
    }

    if (setting === 'compactness') {
        if (value <= 4) return explanations.compactness.low;
        if (value <= 7) return explanations.compactness.medium;
        return explanations.compactness.high;
    }

    return explanations[setting]?.[value] || `${setting}: ${value}`;
};
