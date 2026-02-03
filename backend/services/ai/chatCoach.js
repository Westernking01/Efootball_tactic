import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// genAI will be lazily initialized inside getCoachResponse

const SYSTEM_PROMPT = `
You are the "EF Tactical Coach", a world-class football tactical analyst and eFootball Mobile 2026 expert. 
Your knowledge is a blend of elite real-life coaching (like Pep Guardiola, Jose Mourinho, and Carlo Ancelotti) and high-level competitive eFootball Mobile 2026 gameplay.

**eFootball 2026 NEW FEATURES:**
- **Link Up System**: Enhanced player chemistry system that improves passing accuracy, off-ball movement, and one-two combinations between linked players. Compatible managers include Xabi Alonso, Hansi Flick, L. Spalletti, S. Inzaghi, S. Solbakken, and Pep Guardiola.
- **Enhanced Defensive Gameplay**: More responsive player switching, better AI defensive positioning, improved tackle timing windows, and enhanced pressing coordination.
- **Mobile Enhancements**: Graphics upgrade and new "Cancel Pass" feature for better mobile control.
- **2026 Meta Formations**: Top formations are 4-2-1-3, 3-4-2-1, 4-1-2-3, and 5-2-1-2.
- **Defensive Meta Changes**: Pressing is more effective, Man Marking has been buffed. Recommend Tight Marking and Counter Target instructions.

**THINKING PROCESS:**
- Always analyze formations based on their "In-Possession" and "Out-of-Possession" shapes.
- Consider the 2026 meta (Link Up System compatibility, enhanced defensive mechanics).
- When asked about instructions, recommend the 4-slot eFootball system (Offense 1/2, Defense 1/2).
- Use technical terms: Half-spaces, Double Pivot, Rest Defense, Low Block, High Press, Overloads, Underlaps.
- Always mention if a manager supports Link Up Play for 2026.

**KNOWLEDGE BASE:**
1. **eFootball Playstyles for each Position:**
   - GK: Offensive GK / Defensive GK
   - CB: Build Up / Destroyer / Extra Frontman
   - LB/RB: Offensive Fullback / Defensive Fullback / Fullback Finisher
   - LWB/RWB: Wingback
   - DMF: Anchor Man / Destroyer / Orchestrator
   - CMF: Box-to-Box / Orchestrator / Hole Player
   - AMF: Creative Playmaker / Hole Player / Classic No.10
   - LWF/RWF: Prolific Winger / Cross Specialist / Roaming Flank
   - CF: Goal Poacher / Target Man / Fox in the Box
   - SS: Deep-Lying Forward / Dummy Runner

2. **Top 2026 Meta Managers & Boosters:**
   - Quick Counter: Xabi Alonso (88, Acceleration, Link Up ✓), G. Gasperini (88, Physical Contact).
   - Possession: Hansi Flick (88, Passing, Link Up ✓), Pep Guardiola (88, Technique, Link Up ✓).
   - LBC: L. Spalletti (89, Def Awareness/Stamina, Link Up ✓), S. Inzaghi (88, Speed/Finishing, Link Up ✓).
   - Out Wide: S. Solbakken (89, Heading/Physical, Link Up ✓), Jose Mourinho (88).

3. **Link-Up System (2026 Feature):**
   - This is a tactical synergy between a 'Centrepiece' and a 'Key Man'. 
   - Suggest pairs like a Deep-Lying Forward (Centrepiece) and a Hole Player (Key Man).
   - Always mention if a manager supports 'Link-Up Play' - this is crucial for 2026 meta.
   - Link Up System improves passing accuracy by ~15% and off-ball movement intelligence.

4. **2026 Competitive Meta:**
   - Top formations: 4-2-1-3, 3-4-2-1, 4-1-2-3, 5-2-1-2
   - Enhanced defensive gameplay makes pressing more viable
   - Man Marking and Tight Marking are now more effective
   - Understand "Santos" 4-2-2-2, 4-2-4 overloads, and the balance of 3-CB setups.

**INTERACTIVE FEATURES:**
- When you suggest a specific formation and setup, always end your message with a structured block like this:
  [BOARD_SETUP]{"formation": "4-2-4", "playstyle": "Quick Counter", "individualInstructions": [{"slot": "Offense 1", "instruction": "Anchoring", "position": "RWF"}]}[/BOARD_SETUP]
- Only include this block if you are recommending a specific setup.

Your goal is to help users reach Division 1 in eFootball Mobile 2026.
`;

let genAI = null;

/**
 * Handle chat message with the Tactical Coach
 * @param {string} message - User message
 * @param {Array} history - Message history
 * @returns {Promise<string>} AI response
 */
export const getCoachResponse = async (message, history = []) => {
    try {
        // Ensure env is loaded
        dotenv.config();

        if (!process.env.GEMINI_API_KEY) {
            return getMockCoachResponse(message);
        }

        // Lazy init SDK
        if (!genAI) {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const chat = model.startChat({
            history: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: "Acknowledged. I am the EF Tactical Coach. How can I assist your Division 1 campaign today?" }] },
                ...history.map(h => ({
                    role: h.role === 'user' ? 'user' : 'model',
                    parts: [{ text: h.content }]
                }))
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('❌ Chat Coach Error:', error);
        return getMockCoachResponse(message, true);
    }
};

/**
 * Provides high-quality pre-scripted tactical advice for the user to test the UI logic
 */
const getMockCoachResponse = (message, isError = false) => {
    const msg = message.toLowerCase();

    let response = "";

    if (isError) {
        response = "⚠️ **COACH NOTE:** I'm having trouble connecting to my central neural database. Switching to **Offline Tactical Mode**.\n\n";
    } else {
        response = "> [!TIP]\n> **OFFLINE DEMO MODE ACTIVE:** You are interacting with the Coach's pre-loaded tactical handbook. For full dynamic AI analysis, please add your `GEMINI_API_KEY` to the `.env` file.\n\n";
    }

    if (msg.includes('4-2-4')) {
        response += "### Analysis: The 4-2-4 Meta Overload\nThe 4-2-4 is currently a high-risk, high-reward meta in Division 1. It creates natural 4v4 or 4v3 overloads against most backlines.\n\n- **Strengths:** Impossible to mark all 4 forwards; great for 'Quick Counter'.\n- **Weakness:** The double-pivot (CMFs) can be easily bypassed. \n- **Coach Recommendation:** Set both CMFs to `Defensive` individual instructions to ensure you aren't countered immediately.\n\n[BOARD_SETUP]{\"formation\": \"4-2-4\", \"playstyle\": \"Quick Counter\", \"individualInstructions\": [{\"slot\": \"Defense 1\", \"instruction\": \"Defensive\", \"position\": \"LCMF\"}, {\"slot\": \"Defense 2\", \"instruction\": \"Defensive\", \"position\": \"RCMF\"}]}[/BOARD_SETUP]";
    } else if (msg.includes('deep line') || msg.includes('dmf')) {
        response += "### Tactical insight: The 'Deep Line' Role\nUsing `Deep Line` on an Anchor Man DMF is essential for 3-at-the-back or offensive 4-back setups.\n\n1. **In Possession:** He sits between your CBs or just in front as a single pivot.\n2. **Out of Possession:** He drops into the defensive line, effectively creating a back-5.\n\nThis is the best way to stop the 'Goal Poacher' runs that meta wingers often make.\n\n[BOARD_SETUP]{\"formation\": \"4-3-3\", \"playstyle\": \"Possession Game\", \"individualInstructions\": [{\"slot\": \"Defense 1\", \"instruction\": \"Deep Line\", \"position\": \"DMF\"}]}[/BOARD_SETUP]";
    } else if (msg.includes('counter target') || msg.includes('stamina')) {
        response += "### Pro Tip: Stamina Management\nIn eFootball 2025, stamina drain is significant. If you use a high-press style like 'Quick Counter', your strikers will be dead by 60'.\n\n- **The Fix:** Apply `Counter Target` to your main CF. He will stop tracking back, staying high to be an outlet for transitions while preserving 30% more stamina for the late-game.\n\n[BOARD_SETUP]{\"formation\": \"4-2-1-3\", \"playstyle\": \"Quick Counter\", \"individualInstructions\": [{\"slot\": \"Offense 1\", \"instruction\": \"Counter Target\", \"position\": \"CF\"}]}[/BOARD_SETUP]";
    } else if (msg.includes('santos') || msg.includes('4-2-2-2')) {
        response += "### Analysis: The 'Santos' 4-2-2-2\nThis formation is legendary for its narrow central density. \n\n- **Key Setup:** Use 2 AMFs who are 'Hole Players'.\n- **Flow:** In possession, it looks like a 4-2-4 as the AMFs push into the half-spaces.\n- **Countering it:** Use 'Out Wide' to exploit the massive space left on the wings by the narrow midfield block.\n\n[BOARD_SETUP]{\"formation\": \"4-2-2-2\", \"playstyle\": \"Quick Counter\"}[/BOARD_SETUP]";
    } else {
        response += "As your Tactical Coach, I'm analyzing the modern meta. You asked about tactics, but let me give you a general Division 1 tip:\n\n**Individual Instructions are non-negotiable.** Always set at least one `Defensive` instruction on a DMF and one `Counter Target` on your most explosive CF. \n\nWhat specific formation or instruction should we deep-dive into? (Try asking about 4-2-4 or Deep Line!)\n\n[BOARD_SETUP]{\"formation\": \"4-1-2-3\", \"playstyle\": \"Possession Game\"}[/BOARD_SETUP]";
    }

    return response;
};
