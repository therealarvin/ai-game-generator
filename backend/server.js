import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

console.log('🚀 Starting server initialization...');

dotenv.config();
console.log('✅ Environment variables loaded');
console.log('   PORT:', process.env.PORT || 3001);
console.log('   API Key present:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('✅ Express app created');

// Configure CORS to allow frontend origin
// Allow multiple origins: Vercel frontend, localhost for development, and any .vercel.app domain
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origin string
    const isAllowedString = allowedOrigins.some(allowed => origin === allowed);
    
    // Also allow any .vercel.app domain
    const isVercelDomain = /^https?:\/\/[^\/]+\.vercel\.app$/.test(origin);
    
    if (isAllowedString || isVercelDomain) {
      callback(null, true);
    } else {
      console.log('⚠️  CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));
console.log('✅ CORS enabled');
console.log('   Allowed origins:', allowedOrigins);

app.use(express.json());
console.log('✅ JSON parsing enabled');

// Request logging middleware - logs ALL incoming requests
app.use((req, res, next) => {
  console.log('\n🌐 INCOMING REQUEST');
  console.log(`   ${req.method} ${req.url}`);
  console.log(`   Time: ${new Date().toLocaleTimeString()}`);
  console.log(`   Origin: ${req.headers.origin || 'unknown'}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`   Body:`, JSON.stringify(req.body).substring(0, 200));
  }
  next();
});

console.log('✅ Request logging middleware added');

// Validate OpenAI API key
console.log('🔐 Validating OpenAI API key...');
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
  console.error('\n❌ ERROR: OPENAI_API_KEY is not set or is using placeholder value!');
  console.error('   Please create a .env file in the backend directory with:');
  console.error('   OPENAI_API_KEY=your_actual_api_key_here');
  console.error('   PORT=3001\n');
  process.exit(1);
}
console.log('✅ API key validation passed');

console.log('🤖 Initializing OpenAI client...');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log('✅ OpenAI client initialized');

// Store generated games in memory
const generatedGames = new Map();
console.log('✅ Game storage initialized');

// Generate a game ID
function generateGameId() {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// System prompt for game generation
const GAME_GENERATOR_PROMPT = `You are an expert HTML5 game developer. Generate complete, playable browser games using only HTML, CSS, and vanilla JavaScript.

REQUIREMENTS:
- Create a COMPLETE, SELF-CONTAINED HTML file with inline CSS and JavaScript
- The game MUST be fully functional and playable immediately
- Use HTML5 Canvas for rendering when appropriate
- Include clear instructions on how to play
- Add score/level tracking when relevant
- Make it visually appealing with good CSS styling
- Ensure responsive controls (keyboard/mouse/touch when possible)
- No external libraries or dependencies
- All code in ONE file
- Include a title, game area, and controls section

STRUCTURE:
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Title</title>
    <style>
        /* CSS here - make it look good! */
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: #1a1a2e;
            color: white;
        }
        /* ... more styles */
    </style>
</head>
<body>
    <div id="game-container">
        <h1>Game Title</h1>
        <div id="instructions">How to play...</div>
        <div id="score">Score: 0</div>
        <canvas id="gameCanvas"></canvas>
        <!-- OR use div-based game if canvas not needed -->
    </div>

    <script>
        // Complete game logic here
        // Make it fun and engaging!
    </script>
</body>
</html>

IMPORTANT:
- Return ONLY the HTML code, no explanations
- Make the game immediately playable
- Ensure code is bug-free and complete
- Add color and visual polish`;

// Generate game code using AI
async function generateGame(prompt, difficulty = 'medium') {
  const userPrompt = `Create a fun, playable ${difficulty} difficulty game: ${prompt}

Requirements:
- Make it visually appealing with modern CSS
- Include smooth animations
- Add sound effects using Web Audio API if appropriate
- Make controls intuitive
- Include a game over/win state
- Add a restart button

Generate the complete HTML file now.`;

  console.log('📤 Sending request to OpenAI API...');
  console.log('   Model: gpt-4o');
  console.log('   Max tokens: 4000');
  console.log('   Prompt length:', userPrompt.length, 'characters');

  const startTime = Date.now();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: GAME_GENERATOR_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const duration = Date.now() - startTime;
    console.log(`📥 Received response from OpenAI in ${(duration / 1000).toFixed(2)}s`);
    console.log('   Tokens used:', response.usage?.total_tokens || 'unknown');
    console.log('   Prompt tokens:', response.usage?.prompt_tokens || 'unknown');
    console.log('   Completion tokens:', response.usage?.completion_tokens || 'unknown');

    let gameCode = response.choices[0].message.content;
    console.log('   Response length:', gameCode.length, 'characters');

    // Extract HTML if wrapped in markdown code blocks
    const htmlMatch = gameCode.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      gameCode = htmlMatch[1];
      console.log('   ✂️  Extracted HTML from markdown code block');
    } else {
      // Try without language specifier
      const codeMatch = gameCode.match(/```\n([\s\S]*?)\n```/);
      if (codeMatch) {
        gameCode = codeMatch[1];
        console.log('   ✂️  Extracted code from markdown block');
      }
    }

    console.log('   Final code length:', gameCode.trim().length, 'characters');
    return gameCode.trim();
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ OpenAI API error after ${(duration / 1000).toFixed(2)}s:`, error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    if (error.code) {
      console.error('   Error code:', error.code);
    }
    throw error;
  }
}

console.log('📝 Registering API routes...');

// API endpoint to generate a new game
app.post('/api/game/generate', async (req, res) => {
  const requestStart = Date.now();
  console.log('\n' + '='.repeat(60));
  console.log('🎮 NEW GAME GENERATION REQUEST');
  console.log('='.repeat(60));

  try {
    const { prompt, difficulty = 'medium' } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      console.log('❌ Request rejected: No prompt provided');
      return res.status(400).json({ error: 'Game prompt is required' });
    }

    console.log(`📝 Prompt: "${prompt}"`);
    console.log(`🎯 Difficulty: ${difficulty}`);
    console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
    console.log('-'.repeat(60));

    const gameCode = await generateGame(prompt.trim(), difficulty);
    const gameId = generateGameId();

    const gameData = {
      id: gameId,
      prompt: prompt.trim(),
      difficulty,
      code: gameCode,
      createdAt: new Date().toISOString()
    };

    generatedGames.set(gameId, gameData);

    const totalDuration = Date.now() - requestStart;
    console.log('-'.repeat(60));
    console.log(`✅ Game generated successfully!`);
    console.log(`   Game ID: ${gameId}`);
    console.log(`   Total time: ${(totalDuration / 1000).toFixed(2)}s`);
    console.log(`   Games in memory: ${generatedGames.size}`);
    console.log('='.repeat(60) + '\n');

    res.json({
      gameId,
      prompt: prompt.trim(),
      code: gameCode,
      createdAt: gameData.createdAt
    });
  } catch (error) {
    const totalDuration = Date.now() - requestStart;
    console.log('-'.repeat(60));
    console.error(`❌ GAME GENERATION FAILED after ${(totalDuration / 1000).toFixed(2)}s`);
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    console.log('='.repeat(60) + '\n');

    res.status(500).json({
      error: 'Failed to generate game',
      details: error.message
    });
  }
});

// API endpoint to get a generated game
app.get('/api/game/:gameId', (req, res) => {
  const { gameId } = req.params;
  const game = generatedGames.get(gameId);

  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }

  res.json(game);
});

// API endpoint to list all generated games
app.get('/api/games', (req, res) => {
  const games = Array.from(generatedGames.values()).map(game => ({
    id: game.id,
    prompt: game.prompt,
    difficulty: game.difficulty,
    createdAt: game.createdAt
  }));

  res.json({ games });
});

// API endpoint to improve/modify an existing game
app.post('/api/game/improve', async (req, res) => {
  try {
    const { gameId, improvementPrompt } = req.body;

    const game = generatedGames.get(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    console.log(`🔧 Improving game ${gameId}: "${improvementPrompt}"`);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: GAME_GENERATOR_PROMPT },
        { role: 'user', content: `Here's the current game code:\n\n${game.code}\n\nImprove it based on this request: ${improvementPrompt}\n\nReturn the complete updated HTML file.` }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    let improvedCode = response.choices[0].message.content;

    // Extract HTML if wrapped in markdown
    const htmlMatch = improvedCode.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      improvedCode = htmlMatch[1];
    } else {
      const codeMatch = improvedCode.match(/```\n([\s\S]*?)\n```/);
      if (codeMatch) {
        improvedCode = codeMatch[1];
      }
    }

    // Create new game version
    const newGameId = generateGameId();
    const newGameData = {
      id: newGameId,
      prompt: `${game.prompt} (improved: ${improvementPrompt})`,
      difficulty: game.difficulty,
      code: improvedCode.trim(),
      previousVersion: gameId,
      createdAt: new Date().toISOString()
    };

    generatedGames.set(newGameId, newGameData);

    console.log(`✅ Game improved successfully: ${newGameId}`);

    res.json({
      gameId: newGameId,
      code: improvedCode.trim(),
      createdAt: newGameData.createdAt
    });
  } catch (error) {
    console.error('❌ Error improving game:', error);
    res.status(500).json({
      error: 'Failed to improve game',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    gamesGenerated: generatedGames.size
  });
});

console.log('✅ All routes registered');
console.log(`🚀 Starting server on port ${PORT}...`);

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log(`🎮 AI Game Generator Backend running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🤖 Using OpenAI GPT-4 for game generation`);
  console.log('='.repeat(60) + '\n');
  console.log('✅ Server ready to accept requests!');
});
