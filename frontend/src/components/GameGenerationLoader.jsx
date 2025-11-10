import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function GameGenerationLoader({ elapsedTime }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress based on elapsed time
    const expectedTime = 25; // Expected ~25 seconds for generation
    const calculatedProgress = Math.min((elapsedTime / expectedTime) * 100, 95);
    setProgress(calculatedProgress);
  }, [elapsedTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl px-8">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="h-full w-full rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-2"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Creating Your Game
            </h2>
            <p className="text-muted-foreground text-lg">
              AI is crafting your unique gaming experience
            </p>
          </motion.div>

          {/* Animated orbs */}
          <div className="relative h-32 flex items-center justify-center gap-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-4 w-4 rounded-full bg-primary"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="space-y-3">
            <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Processing...</span>
              <span>{elapsedTime}s elapsed</span>
            </div>
          </div>

          {/* Status indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Analyzing Prompt', done: progress > 10 },
              { label: 'Generating Code', done: progress > 40 },
              { label: 'Optimizing', done: progress > 80 }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <motion.div
                  className={`h-2 w-2 rounded-full ${
                    step.done ? 'bg-primary' : 'bg-muted'
                  }`}
                  animate={step.done ? {} : {
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <span className={step.done ? 'text-foreground' : 'text-muted-foreground'}>
                  {step.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="rounded-lg border border-border bg-card/50 p-4 text-center"
          >
            <p className="text-sm text-muted-foreground">
              This usually takes 10-30 seconds. Complex games may take longer.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
