import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TacticsGenerator from './pages/TacticsGenerator';
import TacticalBoard from './pages/TacticalBoard';
import TacticalCoach from './pages/TacticalCoach';
import Presets from './pages/Presets';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-dark-bg">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/generator" element={<TacticsGenerator />} />
                        <Route path="/board" element={<TacticalBoard />} />
                        <Route path="/coach" element={<TacticalCoach />} />
                        <Route path="/presets" element={<Presets />} />
                    </Routes>
                </main>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#1e293b',
                            color: '#f1f5f9',
                            border: '1px solid #334155',
                        },
                    }}
                />
            </div>
        </Router>
    );
}

export default App;
