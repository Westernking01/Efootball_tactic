// Shared constants for EF TACTICS AI
// Used by both frontend and backend

export const FORMATIONS = [
  '4-3-3',
  '4-2-3-1',
  '4-3-1-2',
  '4-4-2',
  '4-2-2-2',
  '4-1-2-3',
  '4-2-4',
  '4-2-1-3',
  '4-1-3-2',
  '3-2-2-3',
  '3-4-3',
  '3-4-2-1',
  '3-5-2',
  '3-4-1-2',
  '5-2-1-2',
  '5-3-2',
  '5-4-1',
];

export const PLAYSTYLES = [
  'Possession Game',
  'Quick Counter',
  'Long Ball Counter',
  'Out Wide',
];

export const SQUAD_LEVELS = [
  'Beginner',
  'Medium',
  'Advanced',
];

export const OPPONENT_STYLES = [
  'Possession',
  'Counter Attack',
  'Wing Play',
  'Long Ball',
  'High Press',
];

// eFootball 2026 - Updated Manager Database with Link Up System support
export const MANAGERS = {
  'Quick Counter': [
    { name: 'Xabi Alonso', skill: 88, booster: 'Acceleration', formation: '4-2-1-3', linkUpPlay: true, version: '2026' },
    { name: 'G. Gasperini', skill: 88, booster: 'Physical Contact', formation: '3-2-2-3', linkUpPlay: false, version: '2026' },
    { name: 'R. Amorim', skill: 87, booster: 'Offensive Awareness', formation: '3-4-2-1', linkUpPlay: false, version: '2026' },
  ],
  'Possession Game': [
    { name: 'Hansi Flick', skill: 88, booster: 'Passing', formation: '4-1-2-3', linkUpPlay: true, version: '2026' },
    { name: 'Pep Guardiola', skill: 88, booster: 'Technique', formation: '4-3-3', linkUpPlay: true, version: '2026' },
    { name: 'L. Enrique', skill: 85, booster: 'None', formation: '4-3-3', linkUpPlay: false, version: '2026' },
  ],
  'Long Ball Counter': [
    { name: 'L. Spalletti', skill: 89, booster: 'Def Awareness + Stamina', formation: '4-1-3-2', linkUpPlay: true, version: '2026' },
    { name: 'S. Inzaghi', skill: 88, booster: 'Speed + Finishing', formation: '3-5-2', linkUpPlay: true, version: '2026' },
    { name: 'Mikel Arteta', skill: 88, booster: 'Tight Possession', formation: '4-2-1-3', linkUpPlay: false, version: '2026' },
  ],
  'Out Wide': [
    { name: 'S. Solbakken', skill: 89, booster: 'Heading + Physical', formation: '4-4-2', linkUpPlay: true, version: '2026' },
    { name: 'Jose Mourinho', skill: 88, booster: 'Defensive', formation: '4-2-3-1', linkUpPlay: false, version: '2026' },
  ],
  'Long Ball': [
    { name: 'G. Southgate', skill: 82, booster: 'None', formation: '4-2-3-1', linkUpPlay: false, version: '2026' },
  ],
};

export const ATTACKING_AREAS = ['Center', 'Wide', 'Flexible'];

export const BUILD_UP_PATTERNS = ['Short Pass', 'Long Pass', 'Mixed'];

export const DEFENSIVE_STYLES = ['Frontline Pressure', 'Conservative', 'All-Out Defense'];

export const PRESSING_TYPES = ['Aggressive', 'Conservative', 'Frontline'];

// Validation Rules
export const VALIDATION_RULES = {
  MAX_CFS: 2,
  MAX_AMFS: 3,
  POSSESSION_MIN_COMPACTNESS: 6,
  LONG_BALL_MAX_DEFENSIVE_LINE: 7,
  FORMATIONS_REQUIRING_WINGBACKS: ['3-4-3', '3-4-2-1', '3-5-2', '3-4-1-2', '5-2-1-2', '5-3-2', '5-4-1'],
};

// Position mappings
export const POSITION_ROLES = {
  GK: 'Goalkeeper',
  CB: 'Center Back',
  LCB: 'Left Center Back',
  RCB: 'Right Center Back',
  CCB: 'Center Back (Center)',
  LB: 'Left Back',
  RB: 'Right Back',
  LWB: 'Left Wing Back',
  RWB: 'Right Wing Back',
  DMF: 'Defensive Midfielder',
  LDMF: 'Left Defensive Midfielder',
  RDMF: 'Right Defensive Midfielder',
  CMF: 'Central Midfielder',
  LCMF: 'Left Central Midfielder',
  RCMF: 'Right Central Midfielder',
  LMF: 'Left Midfielder',
  RMF: 'Right Midfielder',
  AMF: 'Attacking Midfielder',
  LAMF: 'Left Attacking Midfielder',
  RAMF: 'Right Attacking Midfielder',
  LWF: 'Left Winger',
  RWF: 'Right Winger',
  SS: 'Second Striker',
  LSS: 'Left Second Striker',
  RSS: 'Right Second Striker',
  CF: 'Center Forward',
  LCF: 'Left Center Forward',
  RCF: 'Right Center Forward',
};

export const PLAYSTYLE_TYPES = {
  GK: ['Offensive GK', 'Defensive GK'],
  CB: ['Build Up', 'Destroyer', 'Extra Frontman'],
  LB: ['Offensive Fullback', 'Defensive Fullback', 'Fullback Finisher'],
  RB: ['Offensive Fullback', 'Defensive Fullback', 'Fullback Finisher'],
  LWB: ['Wingback'],
  RWB: ['Wingback'],
  DMF: ['Anchor Man', 'Destroyer', 'Orchestrator'],
  LDMF: ['Anchor Man', 'Destroyer', 'Orchestrator'],
  RDMF: ['Anchor Man', 'Destroyer', 'Orchestrator'],
  CMF: ['Box-to-Box', 'Orchestrator', 'Hole Player'],
  LCMF: ['Box-to-Box', 'Orchestrator', 'Hole Player'],
  RCMF: ['Box-to-Box', 'Orchestrator', 'Hole Player'],
  AMF: ['Creative Playmaker', 'Hole Player', 'Classic No.10'],
  LAMF: ['Creative Playmaker', 'Hole Player', 'Classic No.10'],
  RAMF: ['Creative Playmaker', 'Hole Player', 'Classic No.10'],
  LWF: ['Prolific Winger', 'Cross Specialist', 'Roaming Flank'],
  RWF: ['Prolific Winger', 'Cross Specialist', 'Roaming Flank'],
  SS: ['Deep-Lying Forward', 'Dummy Runner'],
  LSS: ['Deep-Lying Forward', 'Dummy Runner'],
  RSS: ['Deep-Lying Forward', 'Dummy Runner'],
  CF: ['Goal Poacher', 'Target Man', 'Fox in the Box'],
  LCF: ['Goal Poacher', 'Target Man', 'Fox in the Box'],
  RCF: ['Goal Poacher', 'Target Man', 'Fox in the Box'],
};

export const FORMATION_POSITIONS = {
  '4-3-3': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'DMF', 'LCMF', 'RCMF', 'LWF', 'CF', 'RWF'],
  '4-2-3-1': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'LDMF', 'RDMF', 'LMF', 'AMF', 'RMF', 'CF'],
  '4-3-1-2': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'LCMF', 'DMF', 'RCMF', 'AMF', 'LCF', 'RCF'],
  '4-4-2': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'LMF', 'LCMF', 'RCMF', 'RMF', 'LCF', 'RCF'],
  '4-2-2-2': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'LDMF', 'RDMF', 'LAMF', 'RAMF', 'LCF', 'RCF'],
  '4-1-2-3': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'DMF', 'LAMF', 'RAMF', 'LWF', 'CF', 'RWF'],
  '4-2-4': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'LCMF', 'RCMF', 'LWF', 'LCF', 'RCF', 'RWF'],
  '3-2-2-3': ['GK', 'LCB', 'CB', 'RCB', 'LDMF', 'RDMF', 'LAMF', 'RAMF', 'LWF', 'CF', 'RWF'],
  '3-4-3': ['GK', 'LCB', 'CB', 'RCB', 'LMF', 'LDMF', 'RDMF', 'RMF', 'LWF', 'CF', 'RWF'],
  '3-4-2-1': ['GK', 'LCB', 'CB', 'RCB', 'LMF', 'LDMF', 'RDMF', 'RMF', 'LAMF', 'RAMF', 'CF'],
  '3-5-2': ['GK', 'LCB', 'CB', 'RCB', 'LMF', 'LDMF', 'CMF', 'RDMF', 'RMF', 'LCF', 'RCF'],
  '3-4-1-2': ['GK', 'LCB', 'CB', 'RCB', 'LMF', 'LCMF', 'RCMF', 'RMF', 'AMF', 'LCF', 'RCF'],
  '5-2-1-2': ['GK', 'LWB', 'LCB', 'CB', 'RCB', 'RWB', 'LDMF', 'RDMF', 'AMF', 'LCF', 'RCF'],
  '5-3-2': ['GK', 'LWB', 'LCB', 'CB', 'RCB', 'RWB', 'LCMF', 'DMF', 'RCMF', 'LCF', 'RCF'],
  '5-4-1': ['GK', 'LWB', 'LCB', 'CB', 'RCB', 'RWB', 'LMF', 'LDMF', 'RDMF', 'RMF', 'CF'],
  '4-2-1-3': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'LDMF', 'RDMF', 'AMF', 'LWF', 'CF', 'RWF'],
  '4-1-3-2': ['GK', 'LB', 'LCB', 'RCB', 'RB', 'DMF', 'LMF', 'AMF', 'RMF', 'LCF', 'RCF'],
};

export const TAGS = {
  META: 'META',
  BEGINNER: 'BEGINNER',
  ADVANCED: 'ADVANCED',
  DEFENSIVE: 'DEFENSIVE',
  ATTACKING: 'ATTACKING',
  BALANCED: 'BALANCED',
};

// In-Possession Tactics (Offensive Phase)
export const IN_POSSESSION = {
  OFFENSIVE_TACTICS: ['Sustained Attack', 'Counter Attack', 'Long Ball'],
  POSITIONAL_ATTACK_TYPES: ['Center', 'Wide', 'Flexible'],
  SUPPORT_RANGE: { min: 1, max: 10, default: 5 }, // How close players support ball carrier
  OFFENSIVE_LINE: { min: 1, max: 10, default: 5 }, // How high attackers push
  ATTACKING_STYLES: {
    'Possession Game': {
      offensiveTactic: 'Sustained Attack',
      positionalAttack: 'Flexible',
      supportRange: 4, // 10/10 Meta: Close support for tiki-taka Link Up
      offensiveLine: 9, // Push high to pin opponent
    },
    'Quick Counter': {
      offensiveTactic: 'Counter Attack',
      positionalAttack: 'Center',
      supportRange: 7, // Spread out for rapid transitions
      offensiveLine: 10, // Max aggression on break
    },
    'Long Ball Counter': {
      offensiveTactic: 'Long Ball',
      positionalAttack: 'Center',
      supportRange: 6,
      offensiveLine: 6, // Balanced start for direct counters
    },
    'Out Wide': {
      offensiveTactic: 'Sustained Attack',
      positionalAttack: 'Wide',
      supportRange: 6,
      offensiveLine: 7, // Push wide areas
    },
  },
};

// Out-of-Possession Tactics (Defensive Phase)
export const OUT_OF_POSSESSION = {
  DEFENSIVE_TACTICS: ['Frontline Pressure', 'All-Out Defense', 'Conservative Press'],
  PRESSING_INTENSITY: ['Aggressive', 'Moderate', 'Conservative'],
  DEFENSIVE_LINE: { min: 1, max: 10, default: 5 }, // How deep defense sits (1=deep, 10=high)
  COMPACTNESS: { min: 1, max: 10, default: 5 }, // How tight formation is (1=wide, 10=compact)
  DEFENSIVE_STYLES: {
    'Possession Game': {
      defensiveTactic: 'Frontline Pressure',
      pressingIntensity: 'Aggressive',
      defensiveLine: 10, // 10/10 Meta: High line High press
      compactness: 8, // Very compact to force wide
    },
    'Quick Counter': {
      defensiveTactic: 'Frontline Pressure', // QC Meta is high press
      pressingIntensity: 'Aggressive',
      defensiveLine: 9, // Elite QC uses high line
      compactness: 9, // Suffocate midfield
    },
    'Long Ball Counter': {
      defensiveTactic: 'All-Out Defense',
      pressingIntensity: 'Conservative',
      defensiveLine: 2, // 10/10 Meta: Deep block fortress
      compactness: 10, // Maximum compactness
    },
    'Out Wide': {
      defensiveTactic: 'Conservative Press',
      pressingIntensity: 'Moderate',
      defensiveLine: 5,
      compactness: 7, // Tighter than default
    },
  },
};

// eFootball Mobile Specific Individual Instructions (4 slots max)
export const INDIVIDUAL_INSTRUCTIONS = {
  OFFENSE: ['Off', 'Defensive', 'Offensive', 'Anchoring'],
  DEFENSE: ['Off', 'Tight Marking', 'Man Marking', 'Counter Target', 'Deep Line'],
  SLOTS: {
    OFFENSE_1: 'Offense 1',
    OFFENSE_2: 'Offense 2',
    DEFENSE_1: 'Defense 1',
    DEFENSE_2: 'Defense 2',
  }
};

// Phase-specific Shape Transformations (Division 1 Logic)
export const PHASE_TRANSFORMATIONS = {
  '3-4-2-1': {
    inPossession: '3-2-5',
    outOfPossession: '5-4-1',
    wideRoles: ['LMF', 'RMF'], // Usually WBs in this context
    halfSpaceRoles: ['LAMF', 'RAMF'],
    pivotRoles: ['LDMF', 'RDMF'],
    restDefense: ['LCB', 'CB', 'RCB', 'LDMF', 'RDMF'],
    summary: 'When attacking, push wing-backs high and join CAMs with the striker to form 3-2-5. When defending, drop wing-backs and CAMs to build 5-4-1 with a compact block.'
  },
  '4-3-3': {
    inPossession: '2-3-5',
    outOfPossession: '4-5-1',
    wideRoles: ['LWF', 'RWF'],
    halfSpaceRoles: ['LCMF', 'RCMF'],
    pivotRoles: ['DMF'],
    restDefense: ['LCB', 'RCB', 'DMF'],
    summary: 'In possession, fullbacks tuck in while wingers stay high and wide to form 2-3-5. Defensively, wingers drop to midfield forming a compact 4-5-1 block.'
  },
  '4-2-3-1': {
    inPossession: '3-2-5',
    outOfPossession: '4-4-1-1',
    wideRoles: ['LMF', 'RMF'],
    halfSpaceRoles: ['AMF'],
    pivotRoles: ['LDMF', 'RDMF'],
    restDefense: ['LCB', 'RCB', 'LDMF', 'RDMF'],
    summary: 'Attacking wingers push high to join the CF and AMF in a 5-man front line. Defensively, the AMF drops slightly while wide players form a solid midfield bank of 4.'
  },
  '4-1-2-3': {
    inPossession: '2-3-5',
    outOfPossession: '4-1-4-1',
    wideRoles: ['LWF', 'RWF'],
    halfSpaceRoles: ['LAMF', 'RAMF'],
    pivotRoles: ['DMF'],
    restDefense: ['LCB', 'RCB', 'DMF'],
    summary: 'Fullbacks join the DMF to form a 3-man midfield base while the 5 attackers rotate. Defensively, fullbacks return to the back 4 and AMFs drop level with MF.'
  },
  '4-2-1-3': {
    inPossession: '3-2-5',
    outOfPossession: '4-4-1-1',
    wideRoles: ['LWF', 'RWF'],
    halfSpaceRoles: ['AMF'],
    pivotRoles: ['LDMF', 'RDMF'],
    restDefense: ['LCB', 'RCB', 'LDMF', 'RDMF'],
    summary: 'Strong central foundation with a double pivot. Attacking wingers push high and wide while the AMF occupies the hole.'
  },
  '4-1-3-2': {
    inPossession: '2-3-5',
    outOfPossession: '4-1-4-1',
    wideRoles: ['LMF', 'RMF'],
    halfSpaceRoles: ['AMF'],
    pivotRoles: ['DMF'],
    restDefense: ['LCB', 'RCB', 'DMF'],
    summary: 'Wide threat with 2 strikers. Midfield diamond allows for quick transitions and central overloads.'
  },
  '4-2-4': {
    inPossession: '2-4-4',
    outOfPossession: '4-4-2',
    wideRoles: ['LWF', 'RWF'],
    halfSpaceRoles: ['LCF', 'RCF'],
    pivotRoles: ['LCMF', 'RCMF'],
    restDefense: ['LCB', 'RCB', 'LCMF', 'RCMF'],
    summary: 'Attacking overload with 4 forwards. Defensively, wingers must drop to midfield to prevent being bypassed, creating a standard 4-4-2 block.'
  },
  '5-2-1-2': {
    inPossession: '3-2-3-2',
    outOfPossession: '5-3-2',
    wideRoles: ['LWB', 'RWB'],
    halfSpaceRoles: ['AMF'],
    pivotRoles: ['LDMF', 'RDMF'],
    restDefense: ['LCB', 'CB', 'RCB', 'LDMF', 'RDMF'],
    summary: 'Wing-backs provide total width, transforming into a 3-man midfield support. Defensively, they drop to form a flat back 5 with a compact central block.'
  }
};

// Transition Tactics
export const TRANSITIONS = {
  DEFENSIVE_TO_OFFENSIVE: ['Quick Transition', 'Build-Up Play', 'Direct'],
  OFFENSIVE_TO_DEFENSIVE: ['Counter Press', 'Drop Back', 'Immediate Press'],
};

// eFootball 2026 New Features
export const EFOOTBALL_2026_FEATURES = {
  LINK_UP_SYSTEM: {
    enabled: true,
    description: 'Enhanced player chemistry and combination play system',
    benefits: [
      'Improved passing accuracy between linked players',
      'Better off-ball movement and positioning',
      'Enhanced one-two combinations',
      'Stronger team cohesion'
    ],
    compatibleManagers: ['Xabi Alonso', 'Hansi Flick', 'L. Spalletti', 'S. Inzaghi', 'S. Solbakken', 'Pep Guardiola']
  },
  ENHANCED_DEFENSIVE_GAMEPLAY: {
    enabled: true,
    description: 'Refined defensive mechanics for better control',
    improvements: [
      'More responsive player switching',
      'Better AI defensive positioning',
      'Improved tackle timing windows',
      'Enhanced pressing coordination'
    ]
  },
  MOBILE_ENHANCEMENTS: {
    graphicsUpgrade: true,
    cancelPassOnMobile: true,
    description: 'Mobile-specific improvements for better gameplay experience'
  },
  STADIUM_CUSTOMIZATION: {
    enabled: true,
    options: ['Seats', 'Field Lines', 'Lighting', 'Pitch Patterns'],
    description: 'Personalize your stadium appearance'
  },
  TREASURE_LINK: {
    enabled: true,
    type: 'Bingo-style progression system',
    description: 'Complete lines for special rewards and achievements',
    features: ['Multiplayer interaction', 'Special rewards', 'Achievement tracking']
  }
};

// eFootball 2026 Meta Tactics
export const META_2026 = {
  topFormations: ['4-2-1-3', '3-4-2-1', '4-1-2-3', '5-2-1-2'],
  topPlaystyles: ['Possession Game', 'Quick Counter'],
  linkUpSystemBest: {
    formations: ['4-1-2-3', '4-2-1-3', '3-5-2'],
    playstyles: ['Possession Game'],
    managers: ['Hansi Flick', 'Xabi Alonso', 'S. Inzaghi']
  },
  defensiveMetaChanges: {
    pressingMoreEffective: true,
    manMarkingBuffed: true,
    recommendedDefensiveInstructions: ['Tight Marking', 'Counter Target']
  }
};

