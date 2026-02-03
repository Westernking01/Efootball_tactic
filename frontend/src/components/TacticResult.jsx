import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaUser, FaTrophy, FaShieldAlt, FaBullseye } from 'react-icons/fa';

const TacticResult = ({ tactic }) => {
    if (!tactic) return null;

    const { formation, teamSettings, instructions, manager, tags, explanation, validation } = tactic;

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Header with Tags */}
            <div className="card">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{formation} Tactical Setup</h2>
                        <p className="text-primary-400 font-semibold mb-2">{tactic.engineSummary}</p>
                        <p className="text-gray-400">{tactic.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Engine Decision Tags */}
            {tactic.decisionTags && (
                <div className="card bg-primary-900/10 border-primary-500/20">
                    <h3 className="text-sm font-bold text-primary-400 uppercase mb-3 tracking-widest">AI Engine Decision Tags</h3>
                    <div className="flex flex-wrap gap-4 text-xs">
                        <div className="bg-dark-bg/80 p-2 rounded border border-dark-border">
                            <span className="text-gray-500 mr-2">POSSESSION:</span>
                            <span className="text-white font-mono">{tactic.decisionTags.in_possession_shape}</span>
                        </div>
                        <div className="bg-dark-bg/80 p-2 rounded border border-dark-border">
                            <span className="text-gray-500 mr-2">DEFENSIVE:</span>
                            <span className="text-white font-mono">{tactic.decisionTags.out_of_possession_shape}</span>
                        </div>
                        <div className="bg-dark-bg/80 p-2 rounded border border-dark-border">
                            <span className="text-gray-500 mr-2">REST DEFENSE:</span>
                            <span className="text-white font-mono">{tactic.decisionTags.rest_defense?.length > 0 ? tactic.decisionTags.rest_defense.join(', ') : 'Standard'}</span>
                        </div>
                        <div className="bg-dark-bg/80 p-2 rounded border border-dark-border">
                            <span className="text-gray-500 mr-2">TRANSITIONS:</span>
                            <span className="text-white font-mono">Dynamic Animation Active</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Validation Status */}
            {validation && (
                <div className={`card ${validation.valid ? 'border-green-500/30' : 'border-red-500/30'}`}>
                    <div className="flex items-start space-x-3">
                        {validation.valid ? (
                            <FaCheckCircle className="text-green-500 text-2xl flex-shrink-0 mt-1" />
                        ) : (
                            <FaExclamationTriangle className="text-red-500 text-2xl flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">
                                {validation.valid ? 'Valid Tactic ✓' : 'Validation Issues'}
                            </h3>
                            {validation.errors && validation.errors.length > 0 && (
                                <div className="space-y-1 mb-3">
                                    {validation.errors.map((error, idx) => (
                                        <p key={idx} className="text-red-400 text-sm">• {error}</p>
                                    ))}
                                </div>
                            )}
                            {validation.warnings && validation.warnings.length > 0 && (
                                <div className="space-y-1">
                                    {validation.warnings.map((warning, idx) => (
                                        <p key={idx} className="text-yellow-400 text-sm">⚠ {warning}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Manager Recommendation */}
            <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                    <FaUser className="text-primary-500 text-2xl" />
                    <h3 className="text-2xl font-bold">Recommended Manager</h3>
                </div>
                <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xl font-semibold text-primary-400">{manager.name}</p>
                            <p className="text-sm text-gray-400">Formation: {manager.formation}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Management Skill</p>
                            <p className="text-2xl font-bold text-primary-500">{manager.skill}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Settings - Phase Analysis */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center space-x-2">
                        <FaTrophy className="text-primary-500" />
                        <span>Team Tactical Analysis</span>
                    </h3>
                    {tactic.boardData && (
                        <button
                            onClick={() => window.open(`/board?formation=${formation}`, '_blank')}
                            className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-4 py-2 rounded-lg transition-all"
                        >
                            View on Tactical Board
                        </button>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* In-Possession */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary-400 font-bold border-b border-dark-border pb-2">
                            <FaBullseye />
                            <h4>IN-POSSESSION (Offensive)</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Tactic</p>
                                <p className="font-semibold">{teamSettings.inPossession?.offensiveTactic || 'Standard'}</p>
                            </div>
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Width</p>
                                <p className="font-semibold">{teamSettings.inPossession?.positionalAttack || 'Balanced'}</p>
                            </div>
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Support</p>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500" style={{ width: `${(teamSettings.inPossession?.supportRange || 5) * 10}%` }}></div>
                                    </div>
                                    <span className="text-xs">{teamSettings.inPossession?.supportRange || 5}/10</span>
                                </div>
                            </div>
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Line</p>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500" style={{ width: `${(teamSettings.inPossession?.offensiveLine || 5) * 10}%` }}></div>
                                    </div>
                                    <span className="text-xs">{teamSettings.inPossession?.offensiveLine || 5}/10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Out-of-Possession */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-red-400 font-bold border-b border-dark-border pb-2">
                            <FaShieldAlt />
                            <h4>OUT-OF-POSSESSION (Defensive)</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Style</p>
                                <p className="font-semibold">{teamSettings.outOfPossession?.defensiveTactic || 'Standard'}</p>
                            </div>
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Pressing</p>
                                <p className="font-semibold">{teamSettings.outOfPossession?.pressingIntensity || 'Moderate'}</p>
                            </div>
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Line</p>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${(teamSettings.outOfPossession?.defensiveLine || 5) * 10}%` }}></div>
                                    </div>
                                    <span className="text-xs">{teamSettings.outOfPossession?.defensiveLine || 5}/10</span>
                                </div>
                            </div>
                            <div className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                <p className="text-xs text-gray-500 uppercase">Compactness</p>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${(teamSettings.outOfPossession?.compactness || 5) * 10}%` }}></div>
                                    </div>
                                    <span className="text-xs">{teamSettings.outOfPossession?.compactness || 5}/10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* eFootball In-Game Individual Instructions (The 4 Slot System) */}
            {tactic.individualInstructions && (
                <div className="card border-primary-500/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                            <FaBullseye className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">In-Game Individual Instructions</h3>
                            <p className="text-gray-400 text-sm">Set these in your Game Plan (Max 4 slots)</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* In-Possession Instructions */}
                        <div>
                            <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                                In-Possession (Offense)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tactic.individualInstructions.filter(i => i.slot.includes('Offense')).map((inst, idx) => (
                                    <div key={idx} className={`p-4 rounded-xl border transition-all ${inst.position === 'Off' ? 'bg-dark-bg/50 border-dark-border/50 opacity-50' : 'bg-dark-bg border-primary-500/20 hover:border-primary-500/40'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">{inst.slot}</span>
                                            {inst.position !== 'Off' && (
                                                <span className="px-2 py-0.5 bg-primary-900/40 text-primary-400 text-[9px] font-bold rounded uppercase">Active</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-sm border border-gray-700">
                                                {inst.position === 'Off' ? '-' : inst.position}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm">{inst.instruction}</div>
                                                <div className="text-gray-500 text-[10px] uppercase tracking-tighter">Setting</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Out-of-Possession Instructions */}
                        <div>
                            <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                Out-of-Possession (Defense)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tactic.individualInstructions.filter(i => i.slot.includes('Defense')).map((inst, idx) => (
                                    <div key={idx} className={`p-4 rounded-xl border transition-all ${inst.position === 'Off' ? 'bg-dark-bg/50 border-dark-border/50 opacity-50' : 'bg-dark-bg border-red-500/20 hover:border-red-500/40'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">{inst.slot}</span>
                                            {inst.position !== 'Off' && (
                                                <span className="px-2 py-0.5 bg-red-900/40 text-red-400 text-[9px] font-bold rounded uppercase">Active</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-sm border border-gray-700">
                                                {inst.position === 'Off' ? '-' : inst.position}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm">{inst.instruction}</div>
                                                <div className="text-gray-500 text-[10px] uppercase tracking-tighter">Setting</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-3 bg-primary-500/10 rounded-lg border border-primary-500/20">
                        <p className="text-xs text-primary-200">
                            <FaInfoCircle className="inline mr-1" />
                            <strong>Pro Tip:</strong> eFootball Mobile allows exactly 4 individual instructions (2 Offensive, 2 Defensive). These are your most impactful tactical tweaks!
                        </p>
                    </div>
                </div>
            )}

            {/* Individual Role Advice */}
            <div className="card">
                <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2 text-gray-300">
                    <FaUser className="text-gray-500" />
                    <span>Squad Role Advice</span>
                </h3>
                <div className="space-y-3">
                    {instructions.map((instruction, idx) => (
                        <div key={idx} className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-primary-500/30 transition-all">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <span className="text-primary-400 font-bold text-lg">{instruction.position}</span>
                                    <span className="text-gray-400 text-sm ml-2">({instruction.role})</span>
                                </div>
                                <span className="tag tag-balanced text-xs">{instruction.attackingStyle}</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm mb-2">
                                <p className="text-gray-400">
                                    <span className="font-semibold">Defensive:</span> {instruction.defensiveEngagement}
                                </p>
                                {instruction.advancedInstructions && instruction.advancedInstructions.length > 0 && (
                                    <p className="text-gray-400">
                                        <span className="font-semibold">Advanced:</span> {instruction.advancedInstructions.join(', ')}
                                    </p>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 italic">💡 {instruction.reason}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Explanation */}
            {explanation && (
                <div className="card">
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                        <FaInfoCircle className="text-primary-500" />
                        <span>How to Play This Tactic</span>
                    </h3>

                    <div className="space-y-6">
                        {/* Overview */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Overview</h4>
                            <p className="text-gray-400">{explanation.overview}</p>
                        </div>

                        {/* How to Play */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Step-by-Step Guide</h4>
                            <div className="bg-dark-bg rounded-lg p-4 whitespace-pre-line text-gray-400">
                                {explanation.howToPlay}
                            </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-lg mb-2 text-green-400">✓ Strengths</h4>
                                <ul className="space-y-1">
                                    {explanation.strengths.map((strength, idx) => (
                                        <li key={idx} className="text-sm text-gray-400">• {strength}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-2 text-red-400">✗ Weaknesses</h4>
                                <ul className="space-y-1">
                                    {explanation.weaknesses.map((weakness, idx) => (
                                        <li key={idx} className="text-sm text-gray-400">• {weakness}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Tips */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Pro Tips</h4>
                            <div className="space-y-2">
                                {explanation.tips.map((tip, idx) => (
                                    <p key={idx} className="text-sm text-gray-400 bg-dark-bg rounded-lg p-3">
                                        {tip}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TacticResult;
