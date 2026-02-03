import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const TacticalBoard = ({ data }) => {
    const canvasRef = useRef(null);
    const location = useLocation();
    const [canvas, setCanvas] = useState(null);
    const [boardData, setBoardData] = useState(data || location.state?.boardData || null);
    const [tacticData, setTacticData] = useState(location.state?.setup ? { playstyle: location.state.setup.playstyle } : null);
    const [phase, setPhase] = useState('Neutral'); // Offensive, Defensive, Neutral
    const [isAnimating, setIsAnimating] = useState(false);
    const playerObjects = useRef({});
    const animationInterval = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlFormation = params.get('formation');
        const setupState = location.state?.setup;

        if (setupState) {
            // Priority: Setup from Coach/Generator state
            fetch('/api/tactics/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formation: setupState.formation,
                    playstyle: setupState.playstyle || 'Possession Game',
                    individualInstructions: setupState.individualInstructions || [],
                    squadLevel: 'Advanced',
                    opponentStyle: 'Possession'
                })
            })
                .then(res => res.json())
                .then(tactic => {
                    if (tactic.boardData) {
                        setBoardData(tactic.boardData);
                        setTacticData(tactic); // Store full tactic for metadata
                    }
                })
                .catch(err => console.error('Error fetching board data from setup:', err));
        } else if (!boardData && urlFormation) {
            // Fallback: URL params
            fetch('/api/tactics/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formation: urlFormation, playstyle: 'Possession Game', squadLevel: 'Medium', opponentStyle: 'Possession' })
            })
                .then(res => res.json())
                .then(tactic => {
                    if (tactic.boardData) {
                        setBoardData(tactic.boardData);
                        setTacticData(tactic);
                    }
                })
                .catch(err => console.error('Error fetching board data from URL:', err));
        }
    }, [location.search, location.state, boardData]);

    useEffect(() => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 500,
            backgroundColor: '#14532d',
            selection: false
        });

        drawPitchMarkings(fabricCanvas);
        setCanvas(fabricCanvas);

        return () => {
            if (animationInterval.current) clearInterval(animationInterval.current);
            fabricCanvas.dispose();
        };
    }, []);

    useEffect(() => {
        if (canvas && boardData) {
            updateBoard(canvas, boardData, phase);
        }
    }, [canvas, boardData, phase]);

    const drawPitchMarkings = (canvas) => {
        const strokeColor = 'rgba(255, 255, 255, 0.5)';

        // Pitch outline
        canvas.add(new fabric.Rect({
            left: 20, top: 20, width: 760, height: 460,
            fill: 'transparent', stroke: strokeColor, strokeWidth: 2, selectable: false
        }));

        // Center line
        canvas.add(new fabric.Line([400, 20, 400, 480], {
            stroke: strokeColor, strokeWidth: 2, selectable: false
        }));

        // Center circle
        canvas.add(new fabric.Circle({
            left: 350, top: 200, radius: 50,
            fill: 'transparent', stroke: strokeColor, strokeWidth: 2, selectable: false
        }));

        // Penalty boxes
        canvas.add(new fabric.Rect({
            left: 20, top: 125, width: 120, height: 250,
            fill: 'transparent', stroke: strokeColor, strokeWidth: 2, selectable: false
        }));
        canvas.add(new fabric.Rect({
            left: 660, top: 125, width: 120, height: 250,
            fill: 'transparent', stroke: strokeColor, strokeWidth: 2, selectable: false
        }));
    };

    const updateBoard = (canvas, data, activePhase) => {
        let positions = data.positions || [];
        if (activePhase === 'Offensive' && data.offensivePositions) {
            positions = data.offensivePositions;
        } else if (activePhase === 'Defensive' && data.defensivePositions) {
            positions = data.defensivePositions;
        }

        positions.forEach((pos) => {
            let targetX = pos.x * 7.6 + 20;
            let targetY = pos.y * 4.6 + 20;

            if (activePhase === 'Offensive' && pos.role === 'GK') {
                targetX = Math.min(targetX, 100);
            }

            if (!playerObjects.current[pos.role]) {
                const playerGroup = new fabric.Group([
                    new fabric.Circle({
                        radius: 18,
                        fill: '#0ea5e9',
                        stroke: '#ffffff',
                        strokeWidth: 2,
                        originX: 'center',
                        originY: 'center',
                    }),
                    new fabric.Text(pos.role, {
                        fontSize: 12,
                        fill: '#ffffff',
                        fontFamily: 'Inter',
                        fontWeight: 'bold',
                        originX: 'center',
                        originY: 'center',
                    })
                ], {
                    left: targetX,
                    top: targetY,
                    originX: 'center',
                    originY: 'center',
                    selectable: true,
                    data: { isPlayer: true }
                });
                playerObjects.current[pos.role] = playerGroup;
                canvas.add(playerGroup);
            } else {
                const player = playerObjects.current[pos.role];
                player.animate({
                    left: targetX,
                    top: targetY
                }, {
                    duration: 800,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease.easeInOutCubic
                });
            }
        });
    };

    const toggleMotionPlay = () => {
        if (isAnimating) {
            clearInterval(animationInterval.current);
            setIsAnimating(false);
            return;
        }

        setIsAnimating(true);
        const phases = ['Defensive', 'Neutral', 'Offensive', 'Neutral'];
        let currentIdx = phases.indexOf(phase);

        animationInterval.current = setInterval(() => {
            currentIdx = (currentIdx + 1) % phases.length;
            setPhase(phases[currentIdx]);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold gradient-text">Tactical Visualization</h1>
                <p className="text-gray-400">Viewing: {boardData?.formation || 'Standard'} - {phase} Phase</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Board */}
                <div className="flex-1 card p-0 overflow-hidden bg-dark-bg border-4 border-dark-border rounded-xl">
                    <canvas ref={canvasRef} />
                </div>

                {/* Controls */}
                <div className="lg:w-80 space-y-4">
                    <div className="card">
                        <h3 className="font-bold mb-4">Phase Visualization</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {['Offensive', 'Neutral', 'Defensive'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => {
                                        if (isAnimating) toggleMotionPlay();
                                        setPhase(p);
                                    }}
                                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${phase === p ? 'bg-primary-600 text-white' : 'bg-dark-bg text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {p} Phase
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={toggleMotionPlay}
                            className={`w-full mt-4 py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${isAnimating
                                ? 'bg-red-600 text-white'
                                : 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-900/20'
                                }`}
                        >
                            <span className="relative flex h-3 w-3">
                                {isAnimating && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${isAnimating ? 'bg-white' : 'bg-green-100'}`}></span>
                            </span>
                            {isAnimating ? 'Stop Motion Play' : 'Start Motion Play'}
                        </button>
                    </div>

                    <div className="card bg-dark-bg/50 border border-primary-500/30">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Tactical Intelligence
                        </h4>
                        <div className="min-h-[80px] text-sm text-gray-300 prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown>{getNarration(phase, tacticData?.playstyle)}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Educational Narration Logic
const getNarration = (phase, playstyle = 'Possession Game') => {
    if (phase === 'Neutral') return "Returning to Base Formation structure. Players resetting positions.";

    const narratives = {
        'Possession Game': {
            'Offensive': "🏗️ **Build-Up Phase**: Team shape morphs to **3-2-5** or **2-3-5**. Wingers stretch max width to open half-spaces for AMFs. Fullbacks may invert.",
            'Defensive': "🛡️ **High Press (Meta)**: Defensive line steps up to **10/10**. Frontline cuts passing lanes immediately to force turnovers high up the pitch."
        },
        'Quick Counter': {
            'Offensive': "⚡ **Rapid Transition**: Explosive movement! Frontline sprints behind defense. Offensive line pushes to **10/10** to overwhelm opponents instantly.",
            'Defensive': "⚔️ **Aggressive Press**: High line (9/10). Midfield collapses on the ball carrier. The goal is winning the ball back in 3 seconds."
        },
        'Long Ball Counter': {
            'Offensive': "🚀 **Direct Counter**: Strikers peal off shoulders of defenders. Midfield looks for immediate long ball outlet behind the line.",
            'Defensive': "🧱 **Deep Block Fortress**: Defensive line drops to **2/10**. 5-man low block protects the box. Zero space allowed behind the defense."
        },
        'Out Wide': {
            'Offensive': "🎯 **Wide Overload**: Wingers hug the touchline to stretch defense. Strikers make diagonal runs to box expecting the cross.",
            'Defensive': "⚖️ **Balanced Containment**: Midfield shifts laterally to trap opponents on the wings. Defensive Line 5/10."
        }
    };

    return narratives[playstyle]?.[phase] || `${phase} movement phase active.`;
};

export default TacticalBoard;

