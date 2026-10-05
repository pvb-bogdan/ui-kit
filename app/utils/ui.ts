/**
 * Shared Tailwind class strings for form controls.
 * Error state comes from `aria-invalid="true"`, so it overrides the default border
 * without any conditional classes.
 */
export const inputClasses = [
  'w-full rounded-md border-theme border-border-strong bg-surface px-4 py-3 text-base leading-snug text-foreground',
  'placeholder:text-muted/80 transition',
  'hover:border-muted focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/35',
  'disabled:cursor-not-allowed disabled:opacity-55',
  'aria-invalid:border-danger aria-invalid:focus:ring-danger/30'
].join(' ')
