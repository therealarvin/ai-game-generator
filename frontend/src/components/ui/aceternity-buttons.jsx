import React from "react";
import { cn } from "../../lib/utils";

// Border Magic Button - Spinning gradient border
export function BorderMagicButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}

// Shimmer Button - Animated shimmer effect
export function ShimmerButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Top Gradient Button - Gradient line at top
export function TopGradientButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600",
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
      <span className="relative z-20">{children}</span>
    </button>
  );
}

// Sliding Background Button
export function SlidingBackgroundButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "px-8 py-2 border border-black bg-transparent text-black dark:border-white dark:text-white relative group transition duration-200",
        className
      )}
      {...props}
    >
      <div className="absolute -bottom-2 -right-2 bg-yellow-300 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
      <span className="relative">{children}</span>
    </button>
  );
}

// Glowing Border Button
export function GlowingBorderButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-md p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#3b82f6_50%,#a855f7_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}

// Neon Button
export function NeonButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-lg p-[2px] focus:outline-none",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00ffff_0%,#ff00ff_50%,#00ffff_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-950 px-6 text-sm font-medium text-gray-50 backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}

// Rainbow Button
export function RainbowButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000_0%,#ffff00_25%,#00ff00_50%,#00ffff_75%,#ff0000_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}
