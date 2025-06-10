import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl",
        outline: "border-2 border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 hover:border-white/30 shadow-lg",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl",
        ghost: "hover:bg-white/10 hover:backdrop-blur-lg text-white/80 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
        premium: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)]",
        neon: "bg-black/20 border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]",
        glass: "bg-white/10 border border-white/20 backdrop-blur-2xl text-white hover:bg-white/20 shadow-2xl"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 py-2",
        lg: "h-14 rounded-xl px-8 py-4 text-base",
        xl: "h-16 rounded-2xl px-12 py-5 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animated?: boolean;
  glow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animated = true, glow = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (animated) {
      // Create clean props object for motion.button by only including valid HTML button attributes
      const { style: propsStyle, ...otherProps } = props;
      const motionProps = {
        onClick: otherProps.onClick,
        onMouseEnter: otherProps.onMouseEnter,
        onMouseLeave: otherProps.onMouseLeave,
        onFocus: otherProps.onFocus,
        onBlur: otherProps.onBlur,
        disabled: otherProps.disabled,
        type: otherProps.type,
        form: otherProps.form,
        name: otherProps.name,
        value: otherProps.value,
        autoFocus: otherProps.autoFocus,
        tabIndex: otherProps.tabIndex,
        'aria-label': otherProps['aria-label'],
        'aria-describedby': otherProps['aria-describedby'],
        'aria-expanded': otherProps['aria-expanded'],
        'aria-pressed': otherProps['aria-pressed'],
        id: otherProps.id,
        title: otherProps.title,
        role: otherProps.role,
        onKeyDown: otherProps.onKeyDown,
        onKeyUp: otherProps.onKeyUp,
        onMouseDown: otherProps.onMouseDown,
        onMouseUp: otherProps.onMouseUp,
      };
      
      return (
        <motion.button
          className={cn(
            buttonVariants({ variant, size }),
            glow && "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
            className
          )}
          style={{ fontFamily: 'Inter, system-ui, sans-serif', ...(propsStyle || {}) }}
          ref={ref}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.98,
            y: 0,
            transition: { duration: 0.1 }
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...motionProps}
        />
      )
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          glow && "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
          className
        )}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
