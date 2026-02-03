// Agent 2: Rules Validator
// Validates tactics against eFootball Mobile rules

import { VALIDATION_RULES, FORMATION_POSITIONS } from '../../../shared/constants.js';

/**
 * Validate a tactic against eFootball Mobile rules
 * @param {Object} tactic - Tactic to validate
 * @returns {Object} Validation result with errors and suggestions
 */
export const validateTactic = (tactic) => {
    const errors = [];
    const warnings = [];
    const suggestions = [];

    // Check CF count
    const cfCount = tactic.instructions.filter(i => i.position === 'CF').length;
    if (cfCount > VALIDATION_RULES.MAX_CFS) {
        errors.push(`Too many CFs: ${cfCount}. Maximum allowed is ${VALIDATION_RULES.MAX_CFS}`);
        suggestions.push({
            rule: 'MAX_CFS',
            fix: `Change ${cfCount - VALIDATION_RULES.MAX_CFS} CF(s) to SS or AMF`,
            priority: 'CRITICAL',
        });
    }

    // Check AMF count
    const amfCount = tactic.instructions.filter(i => i.position === 'AMF').length;
    if (amfCount > VALIDATION_RULES.MAX_AMFS) {
        errors.push(`Too many AMFs: ${amfCount}. Maximum allowed is ${VALIDATION_RULES.MAX_AMFS}`);
    }

    // Check wingbacks in 3ATB/5ATB formations
    if (VALIDATION_RULES.FORMATIONS_REQUIRING_WINGBACKS.includes(tactic.formation)) {
        const hasLB = tactic.instructions.some(i => i.position === 'LB');
        const hasRB = tactic.instructions.some(i => i.position === 'RB');

        if (hasLB || hasRB) {
            errors.push(`Formation ${tactic.formation} requires LWB/RWB, not LB/RB`);
            suggestions.push({
                rule: 'WINGBACKS_REQUIRED',
                fix: 'Change LB → LWB and RB → RWB',
                priority: 'CRITICAL',
            });
        }
    }

    // Check Possession compactness rule
    if (tactic.teamSettings.playstyle === 'Possession Game') {
        if (tactic.teamSettings.compactness < VALIDATION_RULES.POSSESSION_MIN_COMPACTNESS) {
            errors.push(`Possession Game requires compactness ≥ ${VALIDATION_RULES.POSSESSION_MIN_COMPACTNESS}`);
            suggestions.push({
                rule: 'POSSESSION_COMPACTNESS',
                fix: `Increase compactness to ${VALIDATION_RULES.POSSESSION_MIN_COMPACTNESS} or higher`,
                priority: 'HIGH',
            });
        }
    }

    // Check Long Ball Counter defensive line rule
    if (tactic.teamSettings.playstyle === 'Long Ball Counter') {
        if (tactic.teamSettings.defensiveLine > VALIDATION_RULES.LONG_BALL_MAX_DEFENSIVE_LINE) {
            errors.push(`Long Ball Counter requires defensive line ≤ ${VALIDATION_RULES.LONG_BALL_MAX_DEFENSIVE_LINE}`);
            suggestions.push({
                rule: 'LONG_BALL_DEFENSIVE_LINE',
                fix: `Decrease defensive line to ${VALIDATION_RULES.LONG_BALL_MAX_DEFENSIVE_LINE} or lower`,
                priority: 'HIGH',
            });
        }
    }

    // Check position consistency
    const expectedPositions = FORMATION_POSITIONS[tactic.formation];
    const actualPositions = tactic.instructions.map(i => i.position);

    if (expectedPositions && actualPositions.length !== expectedPositions.length) {
        warnings.push(`Position count mismatch: expected ${expectedPositions.length}, got ${actualPositions.length}`);
    }

    // Check for conflicting instructions
    const conflictingInstructions = checkConflictingInstructions(tactic.instructions);
    if (conflictingInstructions.length > 0) {
        warnings.push(...conflictingInstructions);
    }

    // Check stamina requirements for wingbacks
    const wingbacks = tactic.instructions.filter(i => i.position === 'LWB' || i.position === 'RWB');
    if (wingbacks.length > 0 && wingbacks.some(wb => wb.attackingStyle === 'Offensive Fullback')) {
        warnings.push('Wingbacks with Offensive Fullback style require 85+ stamina');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        suggestions,
    };
};

const checkConflictingInstructions = (instructions) => {
    const conflicts = [];

    // Check for too many attacking players with no defensive engagement
    const noDefenseCount = instructions.filter(i => i.defensiveEngagement === 'None').length;
    if (noDefenseCount > 5) {
        conflicts.push(`Too many players with no defensive engagement (${noDefenseCount}). Team may be vulnerable on defense.`);
    }

    // Check for DMF with no defensive engagement
    const dmfsNoDefense = instructions.filter(i => i.position === 'DMF' && i.defensiveEngagement === 'None');
    if (dmfsNoDefense.length > 0) {
        conflicts.push('DMF should have defensive engagement set to "Always"');
    }

    return conflicts;
};

/**
 * Quick validation for formation and playstyle combination
 * @param {string} formation - Formation name
 * @param {string} playstyle - Playstyle name
 * @returns {Object} Validation result
 */
export const validateFormationPlaystyle = (formation, playstyle) => {
    const warnings = [];

    // Warn about suboptimal combinations
    if (formation.startsWith('5-') && playstyle === 'Out Wide') {
        warnings.push('5-back formations are less effective for Out Wide playstyle. Consider 4-3-3 or 4-2-3-1.');
    }

    if (formation === '4-4-2' && playstyle === 'Possession Game') {
        warnings.push('4-4-2 lacks central midfield control for Possession Game. Consider 4-3-3 or 4-2-3-1.');
    }

    return {
        valid: true,
        warnings,
    };
};
