import { useState } from 'react';
import { FaMagic, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { generateTactic } from '../services/api';
import TacticResult from '../components/TacticResult';

const FORMATIONS = ['4-3-3', '4-2-3-1', '4-3-1-2', '4-4-2', '4-2-2-2', '4-1-2-3', '4-2-4', '3-2-2-3', '3-4-3', '3-4-2-1', '3-5-2', '3-4-1-2', '5-2-1-2', '5-3-2', '5-4-1'];
const PLAYSTYLES = ['Possession Game', 'Quick Counter', 'Long Ball Counter', 'Out Wide'];
const SQUAD_LEVELS = ['Beginner', 'Medium', 'Advanced'];
const OPPONENT_STYLES = ['Possession', 'Counter Attack', 'Wing Play', 'Long Ball', 'High Press'];

const TacticsGenerator = () => {
    const [formData, setFormData] = useState({
        formation: '4-3-3',
        playstyle: 'Possession Game',
        squadLevel: 'Medium',
        opponentStyle: 'Possession',
    });

    const [loading, setLoading] = useState(false);
    const [tactic, setTactic] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTactic(null);

        try {
            const result = await generateTactic(formData);
            setTactic(result);
            toast.success('Tactic generated successfully!');
        } catch (error) {
            console.error('Error generating tactic:', error);
            toast.error('Failed to generate tactic. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="gradient-text">AI Tactics Generator</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Select your preferences and let our AI generate the perfect tactical setup for eFootball Mobile
                </p>
            </div>

            {/* Generator Form */}
            <div className="card max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Formation */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Formation
                        </label>
                        <select
                            name="formation"
                            value={formData.formation}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            {FORMATIONS.map((formation) => (
                                <option key={formation} value={formation}>
                                    {formation}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Choose your preferred formation structure</p>
                    </div>

                    {/* Playstyle */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Team Playstyle
                        </label>
                        <select
                            name="playstyle"
                            value={formData.playstyle}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            {PLAYSTYLES.map((playstyle) => (
                                <option key={playstyle} value={playstyle}>
                                    {playstyle}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">How do you want to play?</p>
                    </div>

                    {/* Squad Level */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Squad Level
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {SQUAD_LEVELS.map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, squadLevel: level })}
                                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${formData.squadLevel === level
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-dark-bg text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Your skill level and squad strength</p>
                    </div>

                    {/* Opponent Style */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Opponent Style
                        </label>
                        <select
                            name="opponentStyle"
                            value={formData.opponentStyle}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            {OPPONENT_STYLES.map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">What type of opponent are you facing?</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <FaMagic />
                                <span>Generate Tactic</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Result */}
            {tactic && <TacticResult tactic={tactic} />}
        </div>
    );
};

export default TacticsGenerator;
