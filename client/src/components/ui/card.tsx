import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  variant?: "default" | "premium" | "glass" | "neon";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-card border-border shadow-sm",
      premium: "bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20 backdrop-blur-xl shadow-2xl",
      glass: "bg-white/5 border-white/10 backdrop-blur-2xl shadow-2xl",
      neon: "bg-black/20 border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl border text-card-foreground transition-all duration-300",
          variantClasses[variant],
          hover && "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1",
          className
        )}
        whileHover={hover ? { 
          scale: 1.02,
          y: -4,
          transition: { duration: 0.2, ease: "easeOut" }
        } : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends HTMLMotionProps<"div"> {
  gradient?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, gradient = false, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl"
    }

    const gradientClass = gradient 
      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      : ""

    return (
      <motion.div
        ref={ref}
        className={cn(
          "font-bold leading-none tracking-tight",
          sizeClasses[size],
          gradientClass,
          className
        )}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground/80 font-light leading-relaxed",
      className
    )}
    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.3 }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.4 }}
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.5 }}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }