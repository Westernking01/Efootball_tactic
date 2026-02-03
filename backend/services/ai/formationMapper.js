// Agent 3: Formation Mapper
// Creates positional data and tactical board layouts

import { FORMATION_POSITIONS, PHASE_TRANSFORMATIONS } from '../../../shared/constants.js';

/**
 * Generate tactical board data for visualization
 * @param {string} formation - Formation name
 * @param {Object} teamSettings - Team tactical settings
 * @param {Array} individualInstructions - Individual player instructions
 * @returns {Object} Board data with positions and shapes
 */
export const generateBoardData = (formation, teamSettings, individualInstructions = []) => {
    const positions = generatePositions(formation, individualInstructions, teamSettings, 'neutral');
    const offensivePositions = generatePositions(formation, individualInstructions, teamSettings, 'offensive');
    const defensivePositions = generatePositions(formation, individualInstructions, teamSettings, 'defensive');

    const defensiveShape = generateDefensiveShape(formation, teamSettings, individualInstructions);
    const attackingShape = generateAttackingShape(formation, teamSettings, individualInstructions);

    return {
        formation,
        positions,
        offensivePositions,
        defensivePositions,
        defensiveShape,
        attackingShape,
    };
};

const generatePositions = (formation, individualInstructions = [], teamSettings = {}, phase = 'neutral') => {
    const positionsList = FORMATION_POSITIONS[formation];
    const positions = [];
    const baseCoords = getPositionCoordinates(formation, individualInstructions);
    const rules = PHASE_TRANSFORMATIONS[formation];

    // Extract Settings (Default to 5 if missing)
    const defLine = teamSettings.defensiveLine ?? 5; // 1 (Deep) - 10 (High)
    const compactness = teamSettings.compactness ?? 5; // 1 (Wide) - 10 (Narrow)
    const offLine = teamSettings.offensiveLine ?? 5; // 1 (Low) - 10 (High)
    const supportRange = teamSettings.supportRange ?? 5; // 1 (Close) - 10 (Far)

    positionsList.forEach((position) => {
        let coords = { ...baseCoords[position] } || { x: 50, y: 50 };

        if (phase === 'offensive') {
            const pushFactor = (offLine - 1) * 2; // 0 to 18 units extra push

            // Generic Offensive Push
            if (position !== 'GK') {
                coords.x = Math.min(95, coords.x + 15 + pushFactor);
            }

            // Phase Rules Override
            if (rules) {
                if (rules.wideRoles.includes(position)) {
                    // Wingers/Fullbacks - Narrative: "Stretch max width" for Possession
                    const isPossessionOrWide = (teamSettings.attackingArea === 'Wide' || teamSettings.playstyle === 'Possession Game');

                    coords.x = Math.min(95, coords.x + 20 + pushFactor);

                    // If Possession/Wide, stick to touchline (y=2/98). Else use standard width.
                    if (isPossessionOrWide) {
                        coords.y = coords.y < 50 ? 2 : 98; // Extreme width
                    } else {
                        coords.y = coords.y < 50 ? 5 : 95; // Standard width
                    }
                }
                if (rules.halfSpaceRoles.includes(position)) {
                    coords.x = Math.min(88, coords.x + 15 + pushFactor);

                    // Use supportRange ONLY for support players (AMF/CMF/SS)
                    // Low support range (4) -> Tighter to center for Link Up
                    const widthMod = (supportRange - 5) * 3; // Amplified effect
                    if (coords.y < 50) coords.y = Math.min(48, 30 + widthMod); // Clamp to varying channel
                    else coords.y = Math.max(52, 70 - widthMod);
                }
                if (rules.pivotRoles.includes(position)) {
                    coords.x = Math.min(60, coords.x + 10 + (pushFactor * 0.5));
                }
                if (rules.restDefense.includes(position)) {
                    // Rest defense stays back relative to offensive line
                    coords.x = Math.min(45, coords.x + (pushFactor * 0.3));
                }
            }

        } else if (phase === 'defensive') {
            // Defensive Line Calculation
            // Line 1 = x15 (Deep), Line 10 = x60 (High Press)
            const baseDefX = 15 + ((defLine - 1) * 5);

            // Compactness Calculation
            // Compactness 10 = Very arrow (squeeze y), 1 = Wide
            const compactFactor = (compactness - 1) * 1.5; // 0 to 13.5 squeeze

            // Apply Depth
            if (position !== 'GK') {
                // Shift whole block relative to baseDefX, maintaining relative structure
                const relativeDepth = coords.x - 20; // Simplify relative depth
                coords.x = Math.max(15, baseDefX + (relativeDepth * 0.5));
            }

            // Apply Compactness (Squeeze towards 50)
            if (position !== 'GK') {
                if (coords.y < 50) coords.y = Math.min(48, coords.y + compactFactor);
                else coords.y = Math.max(52, coords.y - compactFactor);
            }

            // Specific Role logic
            if (rules) {
                if (rules.wideRoles.includes(position)) {
                    // Drop back logic for wingers
                    coords.x = Math.max(baseDefX + 5, coords.x - 20);
                }
            }
        }

        positions.push({
            role: position,
            x: Math.round(coords.x),
            y: Math.round(coords.y), // ensure integer
            heatZone: getHeatZone(position, coords),
        });
    });

    return positions;
};

const getPositionCoordinates = (formation, individualInstructions = []) => {
    // Coordinates for each formation (x: 0-100 vertical, y: 0-100 horizontal)
    const baseCoordinates = {
        '4-3-3': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            DMF: { x: 35, y: 50 },
            LCMF: { x: 45, y: 30 },
            RCMF: { x: 45, y: 70 },
            LWF: { x: 75, y: 10 },
            CF: { x: 80, y: 50 },
            RWF: { x: 75, y: 90 },
        },
        '4-2-3-1': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            LDMF: { x: 35, y: 35 },
            RDMF: { x: 35, y: 65 },
            LMF: { x: 55, y: 15 },
            AMF: { x: 60, y: 50 },
            RMF: { x: 55, y: 85 },
            CF: { x: 80, y: 50 },
        },
        '4-3-1-2': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            LCMF: { x: 40, y: 30 },
            DMF: { x: 35, y: 50 },
            RCMF: { x: 40, y: 70 },
            AMF: { x: 55, y: 50 },
            LCF: { x: 80, y: 35 },
            RCF: { x: 80, y: 65 },
        },
        '4-4-2': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            LMF: { x: 45, y: 15 },
            LCMF: { x: 45, y: 40 },
            RCMF: { x: 45, y: 60 },
            RMF: { x: 45, y: 85 },
            LCF: { x: 80, y: 40 },
            RCF: { x: 80, y: 60 },
        },
        '4-2-2-2': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            LDMF: { x: 38, y: 40 },
            RDMF: { x: 38, y: 60 },
            LAMF: { x: 58, y: 40 },
            RAMF: { x: 58, y: 60 },
            LCF: { x: 82, y: 40 },
            RCF: { x: 82, y: 60 },
        },
        '4-1-2-3': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            DMF: { x: 35, y: 50 },
            LAMF: { x: 55, y: 35 },
            RAMF: { x: 55, y: 65 },
            LWF: { x: 75, y: 15 },
            CF: { x: 85, y: 50 },
            RWF: { x: 75, y: 85 },
        },
        '4-2-4': {
            GK: { x: 5, y: 50 },
            LB: { x: 20, y: 15 },
            LCB: { x: 20, y: 40 },
            RCB: { x: 20, y: 60 },
            RB: { x: 20, y: 85 },
            LCMF: { x: 45, y: 35 },
            RCMF: { x: 45, y: 65 },
            LWF: { x: 75, y: 10 },
            LCF: { x: 80, y: 40 },
            RCF: { x: 80, y: 60 },
            RWF: { x: 75, y: 90 },
        },
        '3-2-2-3': {
            GK: { x: 5, y: 50 },
            LCB: { x: 18, y: 25 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 75 },
            LDMF: { x: 35, y: 40 },
            RDMF: { x: 35, y: 60 },
            LAMF: { x: 55, y: 40 },
            RAMF: { x: 55, y: 60 },
            LWF: { x: 75, y: 15 },
            CF: { x: 85, y: 50 },
            RWF: { x: 75, y: 85 },
        },
        '3-4-3': {
            GK: { x: 5, y: 50 },
            LCB: { x: 18, y: 25 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 75 },
            LMF: { x: 45, y: 10 },
            LDMF: { x: 40, y: 35 },
            RDMF: { x: 40, y: 65 },
            RMF: { x: 45, y: 90 },
            LWF: { x: 75, y: 15 },
            CF: { x: 85, y: 50 },
            RWF: { x: 75, y: 85 },
        },
        '3-4-2-1': {
            GK: { x: 5, y: 50 },
            LCB: { x: 20, y: 25 },
            CB: { x: 18, y: 50 },
            RCB: { x: 20, y: 75 },
            LMF: { x: 45, y: 10 },
            LDMF: { x: 40, y: 35 },
            RDMF: { x: 40, y: 65 },
            RMF: { x: 45, y: 90 },
            LAMF: { x: 60, y: 35 },
            RAMF: { x: 60, y: 65 },
            CF: { x: 85, y: 50 },
        },
        '3-5-2': {
            GK: { x: 5, y: 50 },
            LCB: { x: 18, y: 25 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 75 },
            LMF: { x: 45, y: 10 },
            LDMF: { x: 35, y: 35 },
            CMF: { x: 45, y: 50 },
            RDMF: { x: 35, y: 65 },
            RMF: { x: 45, y: 90 },
            LCF: { x: 80, y: 40 },
            RCF: { x: 80, y: 60 },
        },
        '3-4-1-2': {
            GK: { x: 5, y: 50 },
            LCB: { x: 18, y: 25 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 75 },
            LMF: { x: 45, y: 10 },
            LCMF: { x: 40, y: 35 },
            RCMF: { x: 40, y: 65 },
            RMF: { x: 45, y: 90 },
            AMF: { x: 55, y: 50 },
            LCF: { x: 80, y: 40 },
            RCF: { x: 80, y: 60 },
        },
        '5-2-1-2': {
            GK: { x: 5, y: 50 },
            LWB: { x: 25, y: 10 },
            LCB: { x: 18, y: 30 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 70 },
            RWB: { x: 25, y: 90 },
            LDMF: { x: 40, y: 35 },
            RDMF: { x: 40, y: 65 },
            AMF: { x: 60, y: 50 },
            LCF: { x: 80, y: 40 },
            RCF: { x: 80, y: 60 },
        },
        '5-3-2': {
            GK: { x: 5, y: 50 },
            LWB: { x: 25, y: 10 },
            LCB: { x: 18, y: 30 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 70 },
            RWB: { x: 25, y: 90 },
            LCMF: { x: 45, y: 30 },
            DMF: { x: 40, y: 50 },
            RCMF: { x: 45, y: 70 },
            LCF: { x: 80, y: 40 },
            RCF: { x: 80, y: 60 },
        },
        '5-4-1': {
            GK: { x: 5, y: 50 },
            LWB: { x: 25, y: 10 },
            LCB: { x: 18, y: 30 },
            CB: { x: 18, y: 50 },
            RCB: { x: 18, y: 70 },
            RWB: { x: 25, y: 90 },
            LMF: { x: 55, y: 15 },
            LDMF: { x: 50, y: 40 },
            RDMF: { x: 50, y: 60 },
            RMF: { x: 55, y: 85 },
            CF: { x: 85, y: 50 },
        },
    };

    let formationCoords = baseCoordinates[formation] || generateDefaultCoordinates(formation);

    // Apply individual instructions to shift board positions
    individualInstructions.forEach(inst => {
        if (inst.position === 'Off') return;

        const posKey = inst.position;
        if (formationCoords[posKey]) {
            if (inst.instruction === 'Defensive' || inst.instruction === 'Deep Line') {
                // Shift back
                formationCoords[posKey].x = Math.max(10, formationCoords[posKey].x - 10);
            } else if (inst.instruction === 'Offensive') {
                // Shift forward
                formationCoords[posKey].x = Math.min(95, formationCoords[posKey].x + 10);
            } else if (inst.instruction === 'Anchoring') {
                // Push slightly wide
                if (formationCoords[posKey].y < 50) formationCoords[posKey].y = Math.max(5, formationCoords[posKey].y - 5);
                else formationCoords[posKey].y = Math.min(95, formationCoords[posKey].y + 5);
            }
        }
    });

    return formationCoords;
};

const generateDefaultCoordinates = (formation) => {
    const positions = FORMATION_POSITIONS[formation];
    const coords = {};

    // Simple default positioning
    positions.forEach((pos, idx) => {
        coords[pos] = {
            x: 20 + (idx * 60 / positions.length),
            y: 50,
        };
    });

    return coords;
};

const getHeatZone = (position, coords) => {
    const { x, y } = coords;

    // Determine heat zone based on position and coordinates
    let zone = '';

    // Vertical zone
    if (x < 25) zone += 'Defensive Third';
    else if (x < 60) zone += 'Midfield';
    else zone += 'Attacking Third';

    // Horizontal zone
    if (y < 30) zone += ' - Left';
    else if (y > 70) zone += ' - Right';
    else zone += ' - Center';

    return zone;
};

const generateDefensiveShape = (formation, teamSettings, individualInstructions = []) => {
    const defensiveLine = teamSettings.defensiveLine || 5;
    const compactness = teamSettings.compactness || 6;

    let shape = formation;

    // eFootball specific: Deep Line instructions change defensive shape
    const deepLineCount = individualInstructions.filter(i => i.instruction === 'Deep Line' || i.instruction === 'Defensive').length;

    // Formations shift in defensive phase
    if (formation === '4-3-3') {
        shape = deepLineCount >= 1 ? '5-4-1' : (compactness >= 7 ? '4-5-1' : '4-4-2');
    } else if (formation === '4-2-3-1') {
        shape = '4-5-1';
    } else if (formation === '3-4-2-1' || formation === '3-2-2-3') {
        shape = '5-4-1';
    } else if (formation === '3-5-2') {
        shape = '5-3-2';
    }

    return {
        formation: shape,
        description: `Defensive shape (${shape}) with ${defensiveLine <= 4 ? 'deep' : defensiveLine >= 7 ? 'high' : 'medium'} defensive line and ${compactness >= 7 ? 'high' : 'medium'} compactness. ${deepLineCount > 0 ? 'Instruction-based shape shift active.' : ''}`,
    };
};

const generateAttackingShape = (formation, teamSettings, individualInstructions = []) => {
    const attackingArea = teamSettings.attackingArea || 'Center';

    let shape = formation;

    // eFootball specific: Offensive instructions change attacking shape
    const offensiveCount = individualInstructions.filter(i => i.instruction === 'Offensive').length;

    // Formations shift in attacking phase
    if (formation === '4-3-3') {
        shape = offensiveCount >= 2 ? '2-3-5' : (attackingArea === 'Wide' ? '3-2-5' : '3-2-5');
    } else if (formation === '4-2-3-1') {
        shape = offensiveCount >= 2 ? '3-2-4-1' : (attackingArea === 'Wide' ? '3-2-5' : '3-2-4-1');
    } else if (formation === '5-2-1-2') {
        shape = '3-2-3-2';
    } else if (formation === '3-4-2-1' || formation === '3-2-2-3') {
        shape = offensiveCount >= 1 ? '3-2-3-2' : '3-2-4-1';
    }

    return {
        formation: shape,
        description: `Attacking shape (${shape}) focused on ${attackingArea.toLowerCase()} areas. ${offensiveCount > 0 ? 'Instruction-based offensive overload active.' : ''}`,
    };
};

/**
 * Generate position-specific heat map data
 * @param {string} position - Position code
 * @param {Object} teamSettings - Team settings
 * @returns {Object} Heat map data
 */
export const generateHeatMap = (position, teamSettings) => {
    const heatZones = [];

    // Define heat zones based on position and team settings
    if (position === 'CF') {
        heatZones.push({ zone: 'Opposition Box', intensity: 90 });
        heatZones.push({ zone: 'Attacking Third - Center', intensity: 80 });
    } else if (position === 'LWF' || position === 'RWF') {
        const side = position === 'LWF' ? 'Left' : 'Right';
        heatZones.push({ zone: `Attacking Third - ${side}`, intensity: 90 });
        heatZones.push({ zone: `Midfield - ${side}`, intensity: 60 });
    } else if (position === 'AMF') {
        heatZones.push({ zone: 'Attacking Third - Center', intensity: 85 });
        heatZones.push({ zone: 'Midfield - Center', intensity: 70 });
    } else if (position === 'DMF') {
        heatZones.push({ zone: 'Midfield - Center', intensity: 90 });
        heatZones.push({ zone: 'Defensive Third - Center', intensity: 70 });
    } else if (position === 'LWB' || position === 'RWB') {
        const side = position === 'LWB' ? 'Left' : 'Right';
        heatZones.push({ zone: `Midfield - ${side}`, intensity: 80 });
        heatZones.push({ zone: `Defensive Third - ${side}`, intensity: 75 });
        heatZones.push({ zone: `Attacking Third - ${side}`, intensity: 60 });
    }

    return { position, heatZones };
};
