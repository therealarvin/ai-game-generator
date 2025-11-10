import { motion } from 'framer-motion';
import {
  BorderMagicButton,
  ShimmerButton,
  TopGradientButton,
  SlidingBackgroundButton,
  GlowingBorderButton,
  NeonButton,
  RainbowButton
} from './ui/aceternity-buttons';
import { MovingBorderButton } from './ui/moving-border';
import { Sparkles, Zap, Rocket, Download, Star, Heart, Wand2, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function ButtonShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Aceternity UI Buttons
        </CardTitle>
        <CardDescription>
          Real button components from Aceternity UI library
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {/* Border Magic Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Border Magic</p>
            <BorderMagicButton className="w-full">
              <Wand2 className="h-4 w-4 mr-2" />
              Spinning Border
            </BorderMagicButton>
          </motion.div>

          {/* Moving Border Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Moving Border</p>
            <MovingBorderButton
              className="w-full"
              borderRadius="0.5rem"
              duration={2000}
            >
              <Rocket className="h-4 w-4 mr-2" />
              Animated Border
            </MovingBorderButton>
          </motion.div>

          {/* Shimmer Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Shimmer Effect</p>
            <ShimmerButton className="w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              Shimmer
            </ShimmerButton>
          </motion.div>

          {/* Neon Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Neon Glow</p>
            <NeonButton className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Neon Border
            </NeonButton>
          </motion.div>

          {/* Glowing Border Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Glowing Border</p>
            <GlowingBorderButton className="w-full">
              <Star className="h-4 w-4 mr-2" />
              Purple Glow
            </GlowingBorderButton>
          </motion.div>

          {/* Rainbow Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Rainbow</p>
            <RainbowButton className="w-full">
              <Heart className="h-4 w-4 mr-2" />
              Rainbow Border
            </RainbowButton>
          </motion.div>

          {/* Top Gradient Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Top Gradient</p>
            <TopGradientButton className="w-full">
              <Flame className="h-4 w-4 mr-2" />
              Top Gradient
            </TopGradientButton>
          </motion.div>

          {/* Sliding Background Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">Sliding Background</p>
            <SlidingBackgroundButton className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Slide Effect
            </SlidingBackgroundButton>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
