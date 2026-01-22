/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },
        brand: {
          primary: "var(--color-brand-primary)",
          secondary: "var(--color-brand-secondary)",
          conversion: "var(--color-conversion-accent)",
          trust: "var(--color-trust-builder)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        cta: "var(--color-cta)",
        lcdream: {
          black: "#000000",
          gold: "#D4AF37",
          'gold-light': "#FFD700",
          white: "#f2f2f2",
          gray: "#333333",
          'gray-light': "#cccccc",
          'dark-bg': "#1c1c1c",
        },
      },
      fontFamily: {
        headline: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        cta: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        accent: ['Crimson Text', 'Georgia', 'serif'],
      },
      fontWeight: {
        'headline-regular': '400',
        'headline-semibold': '600',
        'headline-bold': '700',
        'body-light': '300',
        'body-regular': '400',
        'body-semibold': '600',
        'cta-medium': '500',
        'cta-semibold': '600',
        'accent-regular': '400',
        'accent-semibold': '600',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        'base': 'var(--spacing-base)',
        'standard': 'var(--spacing-standard)',
        'section': 'var(--spacing-section)',
      },
      boxShadow: {
        'architectural': '0 4px 12px rgba(212, 175, 55, 0.15)',
        'elevated': '0 8px 24px rgba(212, 175, 55, 0.2)',
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'gold': '0 4px 16px rgba(212, 175, 55, 0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'smooth': '300ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}