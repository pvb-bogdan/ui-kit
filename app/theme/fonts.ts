/**
 * Curated font registry. Clients pick from this list only — never free text —
 * so every option is known to look good and to have the weights we need.
 */

export interface FontDef {
  id: string
  label: string
  family: string
  fallback: string
  role: 'heading' | 'body' | 'both'
  /** Google Fonts `wght@` axis value */
  weights: string
}

export const FONTS: FontDef[] = [
  { id: 'cormorant', label: 'Cormorant Garamond', family: 'Cormorant Garamond', fallback: 'Georgia, serif', role: 'heading', weights: '400;500;600;700' },
  { id: 'playfair', label: 'Playfair Display', family: 'Playfair Display', fallback: 'Georgia, serif', role: 'heading', weights: '400;500;600;700' },
  { id: 'cinzel', label: 'Cinzel', family: 'Cinzel', fallback: 'Georgia, serif', role: 'heading', weights: '400;500;600;700' },
  { id: 'fraunces', label: 'Fraunces', family: 'Fraunces', fallback: 'Georgia, serif', role: 'heading', weights: '300;400;500;600;700' },
  { id: 'marcellus', label: 'Marcellus', family: 'Marcellus', fallback: 'Georgia, serif', role: 'heading', weights: '400' },
  { id: 'bodoni', label: 'Bodoni Moda', family: 'Bodoni Moda', fallback: 'Didot, Georgia, serif', role: 'heading', weights: '400;500;600;700' },
  { id: 'josefin', label: 'Josefin Sans', family: 'Josefin Sans', fallback: 'system-ui, sans-serif', role: 'body', weights: '300;400;500;600' },
  { id: 'manrope', label: 'Manrope', family: 'Manrope', fallback: 'system-ui, sans-serif', role: 'body', weights: '300;400;500;600;700' },
  { id: 'jost', label: 'Jost', family: 'Jost', fallback: 'system-ui, sans-serif', role: 'body', weights: '300;400;500;600' },
  { id: 'lato', label: 'Lato', family: 'Lato', fallback: 'system-ui, sans-serif', role: 'body', weights: '300;400;700' },
  { id: 'montserrat', label: 'Montserrat', family: 'Montserrat', fallback: 'system-ui, sans-serif', role: 'both', weights: '300;400;500;600;700' },
  { id: 'work-sans', label: 'Work Sans', family: 'Work Sans', fallback: 'system-ui, sans-serif', role: 'body', weights: '300;400;500;600' }
]

export const getFont = (id: string): FontDef => FONTS.find(f => f.id === id) ?? FONTS[0]!

export const fontStack = (id: string) => {
  const f = getFont(id)
  return `'${f.family}', ${f.fallback}`
}

/** Only load the fonts currently in use — the same approach the venue site should use. */
export const googleFontsUrl = (ids: string[]) => {
  const families = [...new Set(ids)].map((id) => {
    const f = getFont(id)
    return `family=${f.family.replace(/ /g, '+')}:wght@${f.weights}`
  })
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
}
