---
name: Les Gardiens d’une Promesse
colors:
  surface: '#fff8f8'
  surface-dim: '#e6d6d9'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f2'
  surface-container: '#faeaed'
  surface-container-high: '#f4e4e7'
  surface-container-highest: '#efdfe1'
  on-surface: '#22191c'
  on-surface-variant: '#534247'
  inverse-surface: '#372e30'
  inverse-on-surface: '#fdedf0'
  outline: '#867277'
  outline-variant: '#d8c1c6'
  surface-tint: '#984063'
  primary: '#984063'
  on-primary: '#ffffff'
  primary-container: '#db779b'
  on-primary-container: '#5b0f33'
  inverse-primary: '#ffb0c9'
  secondary: '#7d4e7b'
  on-secondary: '#ffffff'
  secondary-container: '#fdc2f7'
  on-secondary-container: '#7a4b78'
  tertiary: '#894681'
  on-tertiary: '#ffffff'
  tertiary-container: '#c87dbc'
  on-tertiary-container: '#52144e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e3'
  primary-fixed-dim: '#ffb0c9'
  on-primary-fixed: '#3e001e'
  on-primary-fixed-variant: '#7a294b'
  secondary-fixed: '#ffd6f9'
  secondary-fixed-dim: '#eeb4e8'
  on-secondary-fixed: '#320934'
  on-secondary-fixed-variant: '#633762'
  tertiary-fixed: '#ffd7f4'
  tertiary-fixed-dim: '#fdacef'
  on-tertiary-fixed: '#380037'
  on-tertiary-fixed-variant: '#6e2e68'
  background: '#fff8f8'
  on-background: '#22191c'
  surface-variant: '#efdfe1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 20px
  section-padding: 80px
---

## Brand & Style

The design system is centered on a poetic, high-end wedding narrative. It evokes a sense of timeless romance, intimacy, and the delicate beauty of a botanical garden at dusk. The target audience is discerning guests and family members who appreciate sophisticated detail and emotional resonance.

The visual style blends **Modern Editorial** with **Glassmorphism**. It utilizes generous whitespace to let content breathe, mimicking the layout of a luxury invitation or a literary journal. Subtle floral motifs and "bouquet aesthetics" are integrated through soft-focus background textures and organic layering, creating a tactile yet ethereal user experience.

## Colors

The palette is a sophisticated "Floral Dusks" gradient. 
- **Primary (Rose):** Used for key interactive elements and call-to-actions, representing the heart of the promise.
- **Secondary (Soft Lavender):** Used for accents, secondary buttons, and decorative icons.
- **Deep Plum:** Reserved for high-contrast typography and borders to ensure legibility and a sense of gravity.
- **Olive Green:** Used for botanical accents, success states, and natural details, grounding the pink tones.
- **Background (Light Blush):** A warm, enveloping base that softens the overall interface compared to pure white.

Surface containers should utilize a semi-transparent white (`surface_color_hex`) to create the glassmorphism effect against the blush background.

## Typography

This design system employs a classic high-contrast pairing. **Playfair Display** provides the editorial authority and romantic flourish required for headings, while **DM Sans** ensures modern clarity and unobtrusive reading for functional text.

- **Headings:** Should always use Deep Plum for a grounded, ink-on-paper feel. 
- **Body Text:** Use a slightly desaturated version of Deep Plum to maintain softness.
- **Letter Spacing:** Increase spacing slightly for labels to add an air of luxury and intentionality.

## Layout & Spacing

The layout follows a **Fluid Grid** model with an emphasis on vertical rhythm. 
- **Desktop:** A 12-column grid with wide gutters (24px) and significant section padding (80px) to maintain the "premium" feel of a physical wedding program.
- **Mobile:** Transition to a single-column layout with 20px side margins. 
- **Philosophy:** Content should be centered where possible to evoke the feeling of a formal invitation. Elements should never feel crowded; when in doubt, increase padding.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Ambient Shadows** rather than stark elevation tiers.

- **Surface Strategy:** Use backdrop-blur (12px to 20px) on white containers with low opacity (40-60%).
- **Shadows:** Shadows should be extremely soft, using a Deep Plum tint at very low opacity (5-10%) to suggest the surface is floating gently above the blush background.
- **Borders:** Use thin (1px), semi-transparent white borders on glass elements to define edges without adding visual weight.

## Shapes

The shape language is organic and soft. 
- **Standard Elements:** Use a 0.5rem (8px) radius for cards and inputs to provide structure while remaining gentle.
- **Buttons & Chips:** Use a full pill-shape (rounded-xl) to contrast against the structured grid and emphasize the "floral/organic" theme.
- **Imagery:** Wedding photos and gallery items should utilize the `rounded-lg` (16px) or `rounded-xl` (24px) setting to soften their presence.

## Components

### Buttons
Primary buttons use a solid Rose (#DB779B) background with white text and a subtle 0.3s transition to Deep Plum on hover. Secondary buttons use a transparent background with a 1px Soft Lavender border. All buttons are pill-shaped.

### Cards
Cards are the primary expression of the design system's glassmorphism. They feature a `backdrop-filter: blur(16px)`, a semi-transparent white fill, and a very soft Plum-tinted shadow. 

### Form Inputs
Inputs are minimalist. They feature a bottom-border only (1px Deep Plum at 30% opacity) that becomes a full Soft Lavender outline upon focus. Labels use the `label-sm` style, positioned above the field.

### Chips & Tags
Used for guest categories or dietary requirements. These should be pill-shaped with the Olive Green color at 10% opacity for the background and 100% opacity for the text.

### Floral Accents
Decorative components include "floating" SVG floral icons positioned at the corners of glass cards, partially overlapping the borders to break the geometric rigidity.