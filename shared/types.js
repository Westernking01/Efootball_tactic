// Shared type definitions for EF TACTICS AI

/**
 * @typedef {Object} TacticInput
 * @property {string} formation - Formation name (e.g., "4-3-3")
 * @property {string} playstyle - Team playstyle
 * @property {string} squadLevel - Squad strength level
 * @property {string} opponentStyle - Opponent's playing style
 */

/**
 * @typedef {Object} TeamSettings
 * @property {string} playstyle - Team playstyle
 * @property {string} buildUp - Build-up pattern
 * @property {string} attackingArea - Attacking area focus
 * @property {number} supportRange - Support range (1-10)
 * @property {string} defensiveStyle - Defensive style
 * @property {string} pressingType - Pressing type
 * @property {number} defensiveLine - Defensive line depth (1-10)
 * @property {number} compactness - Team compactness (1-10)
 */

/**
 * @typedef {Object} PlayerInstruction
 * @property {string} position - Position code (e.g., "CF", "DMF")
 * @property {string} role - Position role name
 * @property {string} attackingStyle - Attacking playstyle
 * @property {string} defensiveEngagement - Defensive engagement level
 * @property {string[]} advancedInstructions - Additional instructions
 * @property {string} reason - Explanation for these instructions
 */

/**
 * @typedef {Object} Manager
 * @property {string} name - Manager name
 * @property {number} skill - Management skill rating
 * @property {string} formation - Preferred formation
 */

/**
 * @typedef {Object} IndividualInstructionSlot
 * @property {string} slot - Slot name (e.g., "Offense 1")
 * @property {string} position - Position code of the assigned player
 * @property {string} instruction - The instruction value
 */

/**
 * @typedef {Object} Tactic
 * @property {string} id - Unique tactic ID
 * @property {string} name - Tactic name
 * @property {string} formation - Formation
 * @property {TeamSettings} teamSettings - Team tactical settings
 * @property {PlayerInstruction[]} instructions - Individual player role/playstyle data (all players)
 * @property {IndividualInstructionSlot[]} individualInstructions - Specific eFootball individual instructions (4 slots)
 * @property {Manager} manager - Recommended manager
 * @property {string[]} tags - Tactic tags (META, BEGINNER, etc.)
 * @property {string} description - Tactic description
 * @property {Object} boardData - Tactical board visualization data
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether tactic is valid
 * @property {string[]} errors - List of validation errors
 * @property {string[]} warnings - List of warnings
 * @property {Object[]} suggestions - Suggested fixes
 */

/**
 * @typedef {Object} PositionData
 * @property {string} role - Position role
 * @property {number} x - X coordinate (0-100)
 * @property {number} y - Y coordinate (0-100)
 * @property {string} heatZone - Primary heat zone
 */

/**
 * @typedef {Object} BoardData
 * @property {string} formation - Formation name
 * @property {PositionData[]} positions - Neutral phase positions (all 11 players)
 * @property {PositionData[]} offensivePositions - In-possession phase positions
 * @property {PositionData[]} defensivePositions - Out-of-possession phase positions
 * @property {string} defensiveShape - Defensive phase formation name
 * @property {string} attackingShape - Attacking phase formation name
 */

export default {};
