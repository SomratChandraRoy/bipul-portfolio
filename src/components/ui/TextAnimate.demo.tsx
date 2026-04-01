import { TextAnimate } from "@/components/ui/TextAnimate"

/**
 * TextAnimate Component Demo
 * 
 * A premium text animation component that brings text to life with various
 * entrance animations. Perfect for hero sections and impactful headlines.
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 1: Blur In by Character
 * Animates text character by character with blur effect
 */
export function TextAnimateDemo1() {
  return (
    <TextAnimate 
      animation="blurInUp" 
      by="character" 
      duration={2}
      className="text-4xl font-bold text-white"
    >
      Blur in by character
    </TextAnimate>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 2: Blur In by Word
 * Animates text word by word with blur effect - great for headlines
 */
export function TextAnimateDemo2() {
  return (
    <TextAnimate 
      animation="blurInUp" 
      by="word" 
      duration={2}
      className="text-4xl font-bold text-white"
    >
      From Idea to Earning Machine: Web Systems Built for Scale
    </TextAnimate>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 3: Slide Up Animation
 * Text slides up with blur effect - premium entrance
 */
export function TextAnimateDemo3() {
  return (
    <TextAnimate 
      animation="slideUp" 
      by="word" 
      duration={2}
      staggerDelay={0.05}
      className="text-2xl font-semibold text-slate-300"
    >
      Transform your vision into a profitable reality
    </TextAnimate>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 4: Scale In Animation
 * Text scales in with blur effect - emphasis animation
 */
export function TextAnimateDemo4() {
  return (
    <TextAnimate 
      animation="scaleIn" 
      by="word" 
      duration={2.5}
      staggerDelay={0.08}
      className="text-3xl font-bold text-slate-200"
    >
      Stop Buying Websites Invest in a Digital Business Asset
    </TextAnimate>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 5: Long Form Text with Stagger
 * Great for subtitle text with custom stagger delay
 */
export function TextAnimateDemo5() {
  return (
    <TextAnimate 
      animation="blurInUp" 
      by="word" 
      duration={3}
      staggerDelay={0.03}
      delay={0.2}
      className="text-lg font-medium text-slate-400 leading-relaxed"
    >
      I don't just write code. As a full-stack engineer, I build seamless digital ecosystems designed to automate your growth, capture leads, and multiply your revenue.
    </TextAnimate>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 6: Custom Animation with Delay
 * Shows delayed animation start - useful for sequencing
 */
export function TextAnimateDemo6() {
  return (
    <TextAnimate 
      animation="blurInLeft" 
      by="character" 
      duration={1.5}
      delay={0.5}
      staggerDelay={0.01}
      className="text-5xl font-extrabold text-white"
    >
      Code That Converts
    </TextAnimate>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DEMO 7: Premium Hero Headline
 * Complete example with gradient text and spacing
 */
export function TextAnimateDemo7() {
  return (
    <div className="space-y-4">
      <TextAnimate 
        animation="blurInUp" 
        by="word" 
        duration={2.5}
        staggerDelay={0.08}
        className="text-5xl md:text-[72px] font-extrabold text-white leading-tight"
      >
        Your Idea. A Proven Earning System. Seamless Business Growth.
      </TextAnimate>
      
      <TextAnimate 
        animation="blurInUp" 
        by="word" 
        duration={3}
        staggerDelay={0.03}
        delay={0.5}
        className="text-xl text-slate-400 leading-relaxed max-w-3xl"
      >
        Leverage 20+ years of digital business expertise. I engineer custom full-stack web platforms that bridge the gap between your concept and your cash flow.
      </TextAnimate>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * AVAILABLE ANIMATIONS:
 * 
 * 1. blurInUp - Fades in with upward motion and blur effect
 * 2. blurInDown - Fades in with downward motion and blur effect
 * 3. blurInLeft - Fades in with leftward motion and blur effect
 * 4. blurInRight - Fades in with rightward motion and blur effect
 * 5. fadeIn - Simple fade in without motion
 * 6. slideUp - Slides upward without blur
 * 7. slideDown - Slides downward without blur
 * 8. scaleIn - Scales up from smaller size with blur
 * 
 * SEGMENT TYPES (by):
 * 
 * 1. character - Animates each individual character
 * 2. word - Animates each word (recommended for headlines)
 * 3. line - Animates each line separately
 * 
 * CUSTOMIZATION:
 * 
 * - duration: Total animation duration in seconds (default: 1)
 * - delay: Start animation after delay in seconds (default: 0)
 * - staggerDelay: Delay between segments in seconds (default: 0.02)
 * - animation: Type of entrance animation (default: blurInUp)
 * - by: How to segment the text (default: character)
 * - className: Custom CSS classes for styling
 * 
 * PERFORMANCE TIPS:
 * 
 * - Use "word" or "line" segmentation for better performance with long text
 * - Increase staggerDelay for slower, more dramatic effects
 * - Reduce duration for faster animations
 * - Combine with PremiumDraggable for interactive dragging behavior
 */

export default TextAnimateDemo1
