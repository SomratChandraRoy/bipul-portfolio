# 🎨 TextAnimate Component - Feature Guide

## Quick Overview

The **TextAnimate** component brings your text to life with smooth, premium entrance animations. Perfect for hero sections, headlines, and impactful copy.

---

## 🎭 Animation Types

### 1. **blurInUp** (Default)
Text fades in with upward motion and blur effect
```
█████ Initial blur
█████ → text revealed
```

### 2. **blurInDown**
Text fades in with downward motion and blur effect
```
█████ Text enters from above
█████ ↓ Smoothly appears
```

### 3. **blurInLeft**
Text fades in with leftward motion and blur effect
```
← █████ Slides in from left
   █████ Fully visible
```

### 4. **blurInRight**
Text fades in with rightward motion and blur effect
```
        █████ →
█████ Slides in from right
```

### 5. **fadeIn**
Simple fade in without motion
```
0% ---------> 100%
Opacity only
```

### 6. **slideUp**
Slides upward without blur effect
```
  ↑ Text moves up
↓ Starts lower
```

### 7. **slideDown**
Slides downward without blur effect
```
↓ Starts higher
  ↑ Text moves down
```

### 8. **scaleIn**
Scales up from smaller size with blur
```
[Small] ---> [Large]
Blur fades away
```

---

## 📍 Segmentation Modes

### Character Mode (`by="character"`)
Animates each letter individually
```
T h e   Q u i c k   B r o w n   F o x
↓ ↓ ↓   ↓ ↓ ↓ ↓ ↓   ↓ ↓ ↓ ↓ ↓   ↓ ↓ ↓
Each appears with slight delay
```
**Best for:** Typography, emphasis, short text

### Word Mode (`by="word"`)
Animates each word individually
```
The → Quick → Brown → Fox
↓     ↓      ↓      ↓
Great for readability and performance
```
**Best for:** Headlines, subtitles, long text

### Line Mode (`by="line"`)
Animates each line separately
```
Line 1 of text
↓
Line 2 of text
↓
Line 3 of text
```
**Best for:** Multi-line poems, structured content

---

## ⚡ Timing Parameters

### Duration
Total time for the entire animation to complete
```
duration={1}   → 1 second total
duration={2}   → 2 seconds total
duration={3}   → 3 seconds total
```

### Delay
Pause before animation starts
```
delay={0}    → Start immediately
delay={0.5}  → Wait 0.5 seconds
delay={1}    → Wait 1 second
```

### Stagger Delay
Delay between each segment appearing
```
staggerDelay={0.01}  → Quick (character-like)
staggerDelay={0.05}  → Medium (smooth)
staggerDelay={0.1}   → Slow (dramatic)
```

---

## 🎬 Real-World Examples

### Example 1: Hero Headline
```tsx
<TextAnimate 
  animation="blurInUp"
  by="word"
  duration={2}
  staggerDelay={0.08}
>
  From Idea to Earning Machine
</TextAnimate>
```
**Effect:** Words slide up with blur, smooth spacing for maximum impact

### Example 2: Subtitle Text
```tsx
<TextAnimate 
  animation="blurInUp"
  by="word"
  duration={2.5}
  staggerDelay={0.03}
  delay={0.5}
>
  I build seamless digital ecosystems designed to automate your growth
</TextAnimate>
```
**Effect:** Delayed start, fast word reveal, perfect for subtitle timing

### Example 3: Emphasis Text
```tsx
<TextAnimate 
  animation="scaleIn"
  by="word"
  duration={1.5}
  staggerDelay={0.1}
>
  Custom Full-Stack Solutions
</TextAnimate>
```
**Effect:** Words scale up for maximum attention, dramatic effect

### Example 4: Character Animation
```tsx
<TextAnimate 
  animation="blurInUp"
  by="character"
  duration={1}
  staggerDelay={0.02}
>
  PREMIUM
</TextAnimate>
```
**Effect:** Each letter appears individually, high-impact for short words

---

## 🎨 Styling Tips

### Combine with Classes
```tsx
<TextAnimate className="text-4xl font-bold text-white">
  My Text
</TextAnimate>
```

### Gradient Text
```tsx
<TextAnimate className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
  Rainbow Text
</TextAnimate>
```

### Responsive Text
```tsx
<TextAnimate className="text-2xl sm:text-3xl md:text-5xl">
  Responsive Text
</TextAnimate>
```

---

## 🚀 Performance Best Practices

### ✅ DO:
- Use `by="word"` for text longer than 15 words
- Set `staggerDelay={0.03-0.05}` for smooth effects
- Combine with `delay` for animation sequencing
- Use `className` for responsive text

### ❌ DON'T:
- Use `by="character"` for paragraphs (too many animations)
- Set `duration` too short (< 0.5s looks jittery)
- Use `staggerDelay` > 0.15 (feels slow)
- Animate all text on page at once (performance impact)

---

## 🔗 Integration Examples

### With PremiumDraggable
```tsx
<PremiumDraggable intensity="heavy">
  <TextAnimate animation="blurInUp" by="word">
    Draggable Animated Text
  </TextAnimate>
</PremiumDraggable>
```

### In Hero Section
```tsx
<section>
  <TextAnimate animation="blurInUp" by="word" duration={2}>
    Main Headline
  </TextAnimate>
  
  <TextAnimate animation="blurInUp" by="word" delay={0.5}>
    Subtitle here
  </TextAnimate>
</section>
```

### Multiple Animations
```tsx
<div className="space-y-4">
  <TextAnimate animation="blurInUp">Headline</TextAnimate>
  <TextAnimate animation="blurInUp" delay={0.3}>Subheading</TextAnimate>
  <TextAnimate animation="blurInUp" delay={0.6}>Description</TextAnimate>
</div>
```

---

## 📊 Effect Comparison Chart

| Animation | Motion | Blur | Best For |
|-----------|--------|------|----------|
| blurInUp | ↑ Yes | Yes | Hero headlines |
| blurInDown | ↓ Yes | Yes | Top-down content |
| blurInLeft | ← Yes | Yes | Sidebar text |
| blurInRight | → Yes | Yes | Right-aligned text |
| fadeIn | None | No | Subtle reveal |
| slideUp | ↑ Yes | No | No-blur variant |
| slideDown | ↓ Yes | No | Gentle entrance |
| scaleIn | Zoom | Yes | Emphasis text |

---

## 🎯 Use Case Recommendations

### Landing Page Hero
```tsx
animation="blurInUp"
by="word"
duration={2-2.5}
staggerDelay={0.06-0.1}
```

### Product Description
```tsx
animation="blurInUp"
by="word"
duration={2.5-3}
staggerDelay={0.02-0.04}
```

### Feature Highlights
```tsx
animation="scaleIn"
by="word"
duration={1.5-2}
staggerDelay={0.08-0.1}
```

### Long-form Content
```tsx
animation="fadeIn"
by="word"
duration={3}
staggerDelay={0.01-0.02}
```

---

## 🎬 Hero Section Features

### Current Implementation:
- ✅ 4 rotating premium headline variants
- ✅ 12-second rotation interval
- ✅ Smooth 500ms transitions between headlines
- ✅ Word-based animation for optimal readability
- ✅ BlurInUp animation for premium feel
- ✅ Preserved all existing background animations
- ✅ Mobile responsive
- ✅ GPU accelerated for smooth 60fps

### Headline Variants:
1. "From Idea to Earning Machine: Web Systems Built for Scale"
2. "Stop Buying Websites. Invest in a Digital Business Asset"
3. "Code That Converts. Systems That Scale Your Business Smoothly"
4. "Your Idea. A Proven Earning System. Seamless Business Growth"

---

## 🌟 Pro Tips

1. **Layer animations:** Start headline, then subtitle with delay
2. **Match brand:** Choose animation based on brand personality
3. **Test performance:** Check on lower-end devices
4. **Accessibility:** Ensure text is readable during animation
5. **Timing:** Sync with background animations for cohesion
6. **Experimentation:** Try different stagger delays for unique feels

---

## 🐛 Troubleshooting

**Text overlapping?**
- Increase container `min-h` value
- Reduce `staggerDelay` to prevent gaps

**Animation too slow?**
- Decrease `duration` value
- Reduce `staggerDelay`

**Text blurry?**
- This is intentional for "blur" animations
- Use `fadeIn` or `slideUp` if you prefer clarity during animation

**Not working?**
- Ensure Framer Motion is installed
- Check component props are correct
- Verify text content is a string

---

**Created:** 2026-04-01  
**Version:** 1.0 - Production Ready ✨
