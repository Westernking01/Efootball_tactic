import { useState, useEffect } from 'react';
import { FaSpinner, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { getPresets, getPresetById } from '../services/api';
import TacticResult from '../components/TacticResult';

const Presets = () => {
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [loadingPreset, setLoadingPreset] = useState(false);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        loadPresets();
    }, []);

    const loadPresets = async () => {
        try {
            const data = await getPresets();
            setPresets(data);
        } catch (error) {
            console.error('Error loading presets:', error);
            toast.error('Failed to load presets');
        } finally {
            setLoading(false);
        }
    };

    const handlePresetClick = async (presetId) => {
        setLoadingPreset(true);
        setSelectedPreset(null);

        try {
            const tactic = await getPresetById(presetId);
            setSelectedPreset(tactic);
            toast.success('Preset loaded successfully!');

            // Scroll to result
            setTimeout(() => {
                document.getElementById('preset-result')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error('Error loading preset:', error);
            toast.error('Failed to load preset details');
        } finally {
            setLoadingPreset(false);
        }
    };

    const filteredPresets = filter === 'ALL'
        ? presets
        : presets.filter(p => p.tags.includes(filter));

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <FaSpinner className="text-4xl text-primary-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="gradient-text">Preset Tactics Library</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Proven tactics used by top players. Click any preset to view full details.
                </p>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                    <FaFilter className="text-primary-500" />
                    <h3 className="font-semibold">Filter by Tag</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['ALL', 'META', 'BEGINNER', 'ADVANCED', 'DEFENSIVE', 'ATTACKING', 'BALANCED'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === tag
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-dark-bg text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Presets Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPresets.map((preset) => (
                    <div
                        key={preset.id}
                        className="card hover:border-primary-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => handlePresetClick(preset.id)}
                    >
                        <div className="space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="text-xl font-bold">{preset.name}</h3>
                                <span className="text-primary-400 font-bold text-lg">{preset.formation}</span>
                            </div>

                            <p className="text-sm text-gray-400">{preset.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {preset.tags.map((tag) => (
                                    <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-3 border-t border-dark-border">
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Playstyle:</span> {preset.playstyle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPresets.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">No presets found for this filter</p>
                </div>
            )}

            {/* Loading State */}
            {loadingPreset && (
                <div className="flex items-center justify-center py-12">
                    <FaSpinner className="text-4xl text-primary-500 animate-spin" />
                </div>
            )}

            {/* Selected Preset Result */}
            {selectedPreset && (
                <div id="preset-result">
                    <TacticResult tactic={selectedPreset} />
                </div>
            )}
        </div>
    );
};

export default Presets;
