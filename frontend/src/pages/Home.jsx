import { Link } from 'react-router-dom';
import { FaRocket, FaMagic, FaChessBoard, FaBookmark, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
    const features = [
        {
            icon: FaMagic,
            title: 'AI-Powered Generation',
            description: 'Instantly generate optimized tactics based on your formation and playstyle preferences',
        },
        {
            icon: FaChessBoard,
            title: 'Visual Tactical Board',
            description: 'See your formation come to life with interactive tactical board visualization',
        },
        {
            icon: FaBookmark,
            title: 'Preset Library',
            description: 'Access proven tactics used by top players, ready to use immediately',
        },
        {
            icon: FaCheckCircle,
            title: 'Validation Engine',
            description: 'Ensure your tactics follow eFootball Mobile rules and mechanics',
        },
    ];

    const benefits = [
        'Complete tactical setups in under 3 seconds',
        'Individual instructions for every position',
        'Link Up System compatible managers',
        'Enhanced defensive tactics for 2026',
        'Mobile-optimized gameplay tips',
        'Manager recommendations with boosters',
    ];

    return (
        <div className="space-y-16 animate-fade-in">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
                <div className="inline-block">
                    <span className="tag tag-meta text-sm">🎮 eFootball 2026 Compatible • AI-Powered</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Master <span className="gradient-text">eFootball Mobile</span>
                    <br />
                    with AI Tactics
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Generate professional-grade formations, playstyles, and individual instructions
                    optimized for eFootball Mobile in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link to="/generator" className="btn-primary flex items-center space-x-2 group">
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                        <span>Generate Tactics Now</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/presets" className="btn-secondary flex items-center space-x-2">
                        <FaBookmark />
                        <span>Browse Presets</span>
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything You Need to <span className="gradient-text">Dominate</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Powered by intelligent AI agents that understand eFootball Mobile mechanics
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="card hover:border-primary-500 transition-all duration-300 hover:scale-105 animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Icon className="text-4xl text-primary-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* eFootball 2026 Features */}
            <section className="glass-card p-8 md:p-12 border-2 border-primary-500/30">
                <div className="text-center mb-8">
                    <span className="tag tag-meta inline-block mb-4">⚡ NEW IN 2026</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Updated for <span className="gradient-text">eFootball 2026</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our AI is trained on the latest eFootball Mobile 2026 mechanics and features
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-dark-card p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 transition-all">
                        <div className="text-3xl mb-3">🔗</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary-400">Link Up System</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            Enhanced player chemistry for better passing accuracy and off-ball movement
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>✓ Improved one-two combinations</li>
                            <li>✓ Better team cohesion</li>
                            <li>✓ Compatible managers highlighted</li>
                        </ul>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 transition-all">
                        <div className="text-3xl mb-3">🛡️</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary-400">Enhanced Defense</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            Refined defensive mechanics with better AI positioning and pressing
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>✓ Responsive player switching</li>
                            <li>✓ Improved tackle timing</li>
                            <li>✓ Coordinated pressing</li>
                        </ul>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 transition-all">
                        <div className="text-3xl mb-3">📱</div>
                        <h3 className="text-xl font-semibold mb-2 text-primary-400">Mobile Optimized</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            Graphics upgrade and new mobile controls for better gameplay
                        </p>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>✓ Cancel pass feature</li>
                            <li>✓ Enhanced graphics</li>
                            <li>✓ Stadium customization</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/30">
                    <p className="text-sm text-center text-gray-300">
                        <strong className="text-primary-400">2026 Meta:</strong> Top formations include 4-2-1-3, 3-4-2-1, 4-1-2-3 •
                        Best managers: Hansi Flick, Xabi Alonso, S. Inzaghi
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="glass-card p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Why Choose <span className="gradient-text">EF TACTICS AI</span>?
                        </h2>
                        <p className="text-gray-400">
                            Our AI-powered system analyzes your preferences and generates tactics that actually work
                            in eFootball Mobile. No guesswork, no trial and error.
                        </p>
                        <div className="space-y-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <FaCheckCircle className="text-primary-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-300">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-dark-bg rounded-xl p-6 border border-dark-border">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                                <span className="text-gray-400">Generation Speed</span>
                                <span className="text-primary-500 font-bold">&lt; 3 seconds</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                                <span className="text-gray-400">Formations Available</span>
                                <span className="text-primary-500 font-bold">13+</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                                <span className="text-gray-400">Playstyles</span>
                                <span className="text-primary-500 font-bold">4 Types</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-dark-card rounded-lg">
                                <span className="text-gray-400">Validation Rules</span>
                                <span className="text-primary-500 font-bold">100% Accurate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-6 py-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Ready to Elevate Your Game?
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Join thousands of players using AI-generated tactics to win more matches
                </p>
                <Link to="/generator" className="btn-primary inline-flex items-center space-x-2 group">
                    <FaMagic className="group-hover:scale-110 transition-transform" />
                    <span>Start Generating Tactics</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </section>
        </div>
    );
};

export default Home;
