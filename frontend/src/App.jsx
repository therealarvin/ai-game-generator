import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2,
  Download,
  Sparkles,
  Rocket,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Code,
  TrendingUp
} from 'lucide-react';
import { GameGenerationLoader } from './components/GameGenerationLoader';
import { MovingBorderButton } from './components/ui/moving-border';
import {
  BorderMagicButton,
  ShimmerButton,
  NeonButton,
  RainbowButton,
  GlowingBorderButton
} from './components/ui/aceternity-buttons';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [prompt, setPrompt] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [error, setError] = useState(null);
  const [improvementPrompt, setImprovementPrompt] = useState('');
  const [improving, setImproving] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [backendConnected, setBackendConnected] = useState(null);

  // Check backend connection
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_URL}/api/health`, {
          method: 'GET',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setBackendConnected(true);
        } else {
          setBackendConnected(false);
        }
      } catch (err) {
        setBackendConnected(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  // Timer for loading state
  useEffect(() => {
    let interval;
    if (loading || improving) {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading, improving]);

  // Prevent arrow keys from scrolling
  useEffect(() => {
    const preventScrollKeys = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    if (currentGame) {
      window.addEventListener('keydown', preventScrollKeys);
    }

    return () => {
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [currentGame]);

  const generateGame = async () => {
    if (!prompt.trim()) {
      setError('Please enter a game idea!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/game/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim(), difficulty }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate game');
      }

      const data = await response.json();

      setCurrentGame(data);
      setGameHistory([data, ...gameHistory]);
      setPrompt('');
    } catch (err) {
      let errorMessage = err.message;
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to backend server. Please make sure the backend is running.';
      }
      setError(errorMessage);
      setBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const improveGame = async () => {
    if (!currentGame || !improvementPrompt.trim()) {
      setError('Please enter an improvement request!');
      return;
    }

    setImproving(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/game/improve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: currentGame.gameId,
          improvementPrompt: improvementPrompt.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to improve game');
      }

      const data = await response.json();

      const improvedGame = {
        gameId: data.gameId,
        prompt: currentGame.prompt + ' (improved)',
        code: data.code,
        createdAt: data.createdAt,
      };

      setCurrentGame(improvedGame);
      setGameHistory([improvedGame, ...gameHistory]);
      setImprovementPrompt('');
    } catch (err) {
      let errorMessage = err.message;
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to backend server.';
      }
      setError(errorMessage);
      setBackendConnected(false);
    } finally {
      setImproving(false);
    }
  };

  const loadGame = (game) => {
    setCurrentGame(game);
  };

  const downloadGame = () => {
    if (!currentGame) return;

    const blob = new Blob([currentGame.code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `game-${currentGame.gameId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Loading Animation */}
      <AnimatePresence>
        {(loading || improving) && (
          <GameGenerationLoader elapsedTime={elapsedTime} />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Gamepad2 className="h-8 w-8 text-primary relative" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  AI Game Generator
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Describe any game and watch AI bring it to life
                </p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {backendConnected === true ? (
                <Badge variant="default" className="gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Connected
                </Badge>
              ) : backendConnected === false ? (
                <Badge variant="destructive" className="gap-2">
                  <AlertCircle className="h-3 w-3" />
                  Disconnected
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-2">
                  <Clock className="h-3 w-3" />
                  Checking...
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Connection Error Alert */}
      {backendConnected === false && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 pt-4"
        >
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-destructive">Backend Not Connected</p>
                <p className="text-sm text-destructive/80 mt-1">
                  Cannot reach backend at <code className="bg-destructive/20 px-1 rounded">{API_URL}</code>
                </p>
                <p className="text-sm text-destructive/80 mt-1">
                  {import.meta.env.VITE_API_URL 
                    ? 'Check that the backend is deployed and the URL is correct.'
                    : 'Make sure the backend server is running: cd backend && npm start'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Generate Game Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Generate a Game
                  </CardTitle>
                  <CardDescription>
                    Describe your game idea and let AI create it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="e.g., 'A snake game with neon colors' or 'Flappy bird but with a spaceship'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="min-h-[120px] resize-none"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      disabled={loading}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <BorderMagicButton
                    onClick={generateGame}
                    disabled={loading || !prompt.trim()}
                    className="w-full"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Game
                  </BorderMagicButton>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
                    >
                      {error}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Improve Game Card */}
            {currentGame && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Improve Game
                    </CardTitle>
                    <CardDescription>
                      Request improvements or modifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="e.g., 'Make it faster' or 'Add power-ups'"
                      value={improvementPrompt}
                      onChange={(e) => setImprovementPrompt(e.target.value)}
                      disabled={improving}
                      className="min-h-[100px] resize-none"
                    />
                    <MovingBorderButton
                      onClick={improveGame}
                      disabled={improving || !improvementPrompt.trim()}
                      className="w-full"
                      borderRadius="0.5rem"
                      duration={3000}
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Improve
                    </MovingBorderButton>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Game History */}
            {gameHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Game History ({gameHistory.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                    {gameHistory.map((game, index) => (
                      <motion.button
                        key={game.gameId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => loadGame(game)}
                        className={`w-full text-left p-3 rounded-md border transition-all ${
                          currentGame?.gameId === game.gameId
                            ? 'bg-primary/10 border-primary'
                            : 'bg-card border-border hover:bg-accent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="font-mono">
                            #{index + 1}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {game.prompt}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(game.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Game Area */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {currentGame ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-2">
                          {currentGame.prompt}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          Created: {new Date(currentGame.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                      <NeonButton
                        onClick={downloadGame}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </NeonButton>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-border overflow-hidden bg-black/50">
                      <iframe
                        srcDoc={currentGame.code}
                        title="Game Sandbox"
                        sandbox="allow-scripts allow-same-origin"
                        className="w-full h-[600px] lg:h-[700px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full min-h-[600px] flex items-center justify-center">
                  <CardContent className="text-center space-y-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Gamepad2 className="h-24 w-24 mx-auto text-muted-foreground/50" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">No game loaded</h2>
                      <p className="text-muted-foreground mb-6">
                        Enter a game idea and click "Generate Game" to get started
                      </p>
                    </div>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      <h4 className="font-semibold text-sm">Example prompts:</h4>
                      <div className="space-y-2">
                        {[
                          'A snake game with rainbow colors',
                          'Flappy bird but in space',
                          'A pong game with power-ups',
                          'Memory card matching game',
                          'Breakout with special bricks'
                        ].map((example, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {example}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
