---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
---
This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.
The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
## Design Thinking
Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: For Pet Magic (宠物魔法), we adopt a **playful-professional** aesthetic inspired by phopet.com - warm, inviting, and pet-friendly while maintaining credibility. Think: joyful but trustworthy, colorful but not childish, fun but functional.
- **Constraints**: Next.js 14+ with TypeScript, Tailwind CSS, shadcn/ui components, responsive mobile-first design, accessibility standards (WCAG AA).
- **Differentiation**: **Emotional warmth meets professional quality** - every interaction should feel like playing with a beloved pet while delivering studio-quality results. Key memorable elements: bouncy micro-animations, generous rounded corners, vibrant orange-teal gradient system, and emoji-enhanced iconography.

**CRITICAL**: Execute a **pet-centric design language** with precision - rounded shapes mirror pet friendliness, warm colors evoke joy and trust, smooth animations reflect playful energy.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable  
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines (Pet Magic Specific)

**🎯 Design Philosophy**: Create an interface that pet owners instinctively trust - combining the playfulness of their pets with the professionalism they expect from AI tools.

Focus on:

- **Typography**: 
  - **Headings**: Use Poppins or Nunito (rounded, friendly sans-serifs) with bold weights (font-bold, font-extrabold) for maximum warmth
  - **Body**: Maintain clarity with system fonts (-apple-system, BlinkMacSystemFont) for performance
  - **Scale**: Large, confident headings (text-4xl md:text-5xl lg:text-6xl) that command attention
  - **Hierarchy**: Clear visual steps - Hero (text-6xl) → Section (text-4xl) → Card (text-xl) → Body (text-base)

- **Color & Theme**: 
  - **Primary Palette**: Vibrant Orange (#FF6B35, #FF8C42, #FFA366) - energy, creativity, warmth
  - **Secondary Palette**: Fresh Teal (#20B2AA, #17A2B8, #40E0D0) - trust, calmness, reliability  
  - **Neutrals**: Pure White (#FFFFFF) base with soft grays (#F8F9FA, #E9ECEF) for cards
  - **Accents**: Coral (#FF7F50), Mint (#98FF98), Sunny Yellow (#FFD700) for highlights
  - **Gradients**: Soft multi-stops (from-orange-50 via-white to-teal-50) for backgrounds, bold directional (from-orange-500 to-teal-500) for CTAs
  - **Implementation**: Define CSS custom properties in globals.css for theme consistency

- **Motion & Micro-interactions**:
  - **Hover States**: Lift cards upward with `-translate-y-2` + `shadow-2xl` for tactile feedback
  - **Button Interactions**: Scale up slightly (scale-105) with spring-like transitions (transition-all duration-200)
  - **Page Loads**: Staggered fade-ins with `animation-delay` (100ms increments) for content sections
  - **Scroll Triggers**: Gentle fade-up animations as elements enter viewport
  - **Playful Touches**: Subtle bounce animations on primary CTAs, gentle pulse on loading states
  - **Performance**: Use CSS transforms (translate, scale) over position changes; prefer `will-change: transform` for smoother animations

- **Spatial Composition**:
  - **Rounded Everything**: Large border-radius values (rounded-2xl for cards, rounded-3xl for hero sections, rounded-full for avatars/buttons)
  - **Card Layouts**: Clean grid systems with generous gaps (gap-6 on mobile, gap-8 on desktop)
  - **Responsive Grids**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for features, galleries
  - **Spacing Rhythm**: Consistent vertical spacing (py-12, py-16, py-20) between sections; horizontal padding (px-4, px-6, px-8)
  - **Max Widths**: Container constraints (max-w-6xl, max-w-7xl) for readable content blocks
  - **Alignment**: Center-align hero content, left-align body text for readability

- **Backgrounds & Visual Details**:
  - **Layered Gradients**: Multi-stop linear gradients for depth (`bg-gradient-to-br from-orange-50 via-white to-teal-50`)
  - **Shadows**: Generous elevation (shadow-lg, shadow-xl, shadow-2xl) for cards and floating elements
  - **Glassmorphism**: Subtle `backdrop-blur-sm` with `bg-white/90` for overlays
  - **Decorative Elements**: Large emoji icons (text-5xl, text-6xl) for feature highlights
  - **Image Treatments**: Rounded corners on all images, subtle hover zoom (scale-110) for galleries
  - **Texture**: Optional subtle noise/grain overlays for premium feel

**🚫 Avoid**:
- Generic AI aesthetics (purple gradients, Inter/Roboto defaults, flat minimalism)
- Sharp corners and rigid layouts
- Muted, corporate color schemes  
- Predictable hover states (simple color changes)
- Dense, cramped layouts without breathing room
Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.