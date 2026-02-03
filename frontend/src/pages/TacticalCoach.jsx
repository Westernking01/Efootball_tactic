import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaUserTie, FaRobot, FaInfoCircle, FaChessBoard } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TacticalCoach = () => {
    const [messages, setMessages] = useState([
        {
            role: 'coach',
            content: "Welcome to the Tactical Room. I am your EF Tactical Coach. Whether you're struggling with a Low Block, need to optimize your 4-2-4 overloads, or want to master the 'Santos' meta, I'm here to analyze. What tactical challenge are we solving today?",
            timestamp: new Date().toISOString()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const parseTacticalSetup = (content) => {
        const boardMatch = content.match(/\[BOARD_SETUP\](.*?)\[\/BOARD_SETUP\]/s);
        if (boardMatch) {
            try {
                const setupData = JSON.parse(boardMatch[1]);
                const cleanContent = content.replace(/\[BOARD_SETUP\].*?\[\/BOARD_SETUP\]/s, '').trim();
                return { setupData, cleanContent };
            } catch (e) {
                console.error('Failed to parse board setup:', e);
            }
        }
        return { setupData: null, cleanContent: content };
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: input,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await axios.post('/api/chat', {
                message: input,
                history
            });

            const { setupData, cleanContent } = parseTacticalSetup(response.data.response);

            const coachMessage = {
                role: 'coach',
                content: cleanContent,
                setupData,
                timestamp: response.data.timestamp
            };

            setMessages(prev => [...prev, coachMessage]);
        } catch (error) {
            console.error('Chat Error:', error);
            toast.error(error.response?.data?.error || 'Coach is momentarily unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col pt-4">
            {/* Header */}
            <div className="card mb-4 flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl border-2 border-primary-500 shadow-lg shadow-primary-500/20">
                        <FaUserTie />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">EF Tactical Coach</h2>
                        <p className="text-xs text-primary-400 font-mono flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            DIVISION 1 EXPERTISE ACTIVE
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-gray-500 text-xs italic">
                    <FaInfoCircle />
                    Grounded in eFootball 2025 Meta
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-secondary-600' : 'bg-primary-900 border border-primary-500/30'
                                }`}>
                                {msg.role === 'user' ? <FaRobot className="text-sm" /> : <FaUserTie className="text-sm text-primary-400" />}
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user'
                                ? 'bg-secondary-600 text-white rounded-tr-none'
                                : 'bg-dark-card border border-dark-border text-gray-200 rounded-tl-none'
                                }`}>
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>

                                {msg.setupData && (
                                    <div className="mt-4 p-3 bg-primary-900/30 border border-primary-500/30 rounded-xl flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                                                <FaChessBoard />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">Tactical Setup Found</p>
                                                <p className="text-[10px] text-primary-400 capitalize">{msg.setupData.formation} • {msg.setupData.playstyle || 'Custom Style'}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate('/board', { state: { setup: msg.setupData } })}
                                            className="px-3 py-1.5 bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                                        >
                                            Visualize on Board
                                        </button>
                                    </div>
                                )}

                                <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-pulse">
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center">
                                <FaUserTie className="text-sm text-primary-400" />
                            </div>
                            <div className="bg-dark-card border border-dark-border p-4 rounded-2xl rounded-tl-none italic text-gray-500 text-sm">
                                Coach is analyzing the pitch...
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about formations, playstyles, or individual instructions..."
                    className="w-full bg-dark-card border-2 border-dark-border hover:border-primary-500/30 focus:border-primary-500 rounded-2xl py-4 pl-6 pr-16 text-white transition-all outline-none shadow-xl"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-600 hover:bg-primary-500 disabled:bg-gray-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg"
                >
                    <FaPaperPlane className={isLoading ? 'animate-bounce' : ''} />
                </button>
            </form>

            <div className="text-center mt-4 pb-2">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                    Tactical Analysis Engine v2.5 • Powered by Gemini AI
                </p>
            </div>
        </div>
    );
};

export default TacticalCoach;
