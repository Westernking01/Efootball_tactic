import { Link, useLocation } from 'react-router-dom';
import { FaFutbol, FaHome, FaMagic, FaChessBoard, FaBookmark, FaUserTie } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: FaHome },
        { path: '/generator', label: 'Generator', icon: FaMagic },
        { path: '/board', label: 'Tactical Board', icon: FaChessBoard },
        { path: '/coach', label: 'Tactical Coach', icon: FaUserTie },
        { path: '/presets', label: 'Presets', icon: FaBookmark },
    ];

    return (
        <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <FaFutbol className="text-3xl text-primary-500 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-xl font-bold gradient-text">EF TACTICS AI</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-300 hover:bg-dark-bg hover:text-white'
                                        }`}
                                >
                                    <Icon className="text-lg" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-gray-300 hover:text-white p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden pb-4">
                    <div className="flex flex-col space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-300 hover:bg-dark-bg hover:text-white'
                                        }`}
                                >
                                    <Icon className="text-lg" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
