// dsh-deepspace-theme — client (browser) half.
//
// SAFETY CONTRACT: this theme only ever does two things:
//   1. Override the official `--dsw-*` token palette via `ctx.theme.overrideTokens`.
//   2. Inject ONE <style> block that uses STABLE selectors only (data-* attributes,
//      `body`, `:root`, [role=...]) — NEVER build-time hash class names like
//      `.Md3f7G_*`, `.wSkVaW_*`, `.hHd-Xa_*`, `.pXSMma_*`, `.FJxK0a_*`.
//
// Build-time hash class names change on every dsh frontend rebuild; that is
// exactly what broke the kimino theme's scroll and sidebar. Token overrides and
// data-* selectors do not depend on those hashes, so this theme keeps working
// across dsh upgrades.

// Self-sufficiency shim: the dynamic Cordis runner injects `styles` as a closure
// symbol. Anywhere else (e.g. a static module bundle built from this file) the
// symbol does not exist and referencing it throws. Provide an equivalent so this
// source works in both worlds.
if (typeof styles === 'undefined') {
  var styles = {
    insert: (css) => {
      const el = document.createElement('style');
      el.id = 'deepspace-theme';
      el.setAttribute('data-plugin', 'dsh-deepspace-theme');
      el.textContent = css;
      document.head.append(el);
      // koffi/node-pty style: return the disposing function.
      return () => el.remove();
    },
  };
}

// Helper: most tokens are scheme-invariant in this palette, so emit the same
// value for light and dark (the override API requires both modes).
const pair = (v) => ({ light: v, dark: v });

return {
  apply(ctx) {
    const theme = ctx.get('theme') || ctx.theme;
    if (!theme) {
      // Theme service not present (e.g. running under a non-web surface).
      return;
    }

    // ── 1) Official token palette override ────────────────────────────────
    // Comet blue (#93C5FD) accent over deep-space slate/indigo glass surfaces.
    const dispose = theme.overrideTokens('deepspace', {
      // Surfaces: translucent slate so a background image/gradient shows through
      '--dsw-alias-bg-base': pair('rgba(5, 8, 20, 0)'),
      '--dsw-alias-bg-layer-1': pair('rgba(15, 23, 42, 0.75)'),
      '--dsw-alias-bg-layer-2': pair('rgba(15, 23, 42, 0.80)'),
      '--dsw-alias-bg-layer-3': pair('rgba(15, 23, 42, 0.85)'),
      '--dsw-alias-bg-overlay': pair('rgba(10, 14, 26, 0.90)'),
      '--dsw-alias-bg-module-platform': pair('rgba(255, 255, 255, 0.08)'),
      '--dsw-alias-bg-multi-select': pair('rgba(147, 197, 253, 0.15)'),

      // Borders: low-saturation comet blue hairlines
      '--dsw-alias-border-l1': pair('rgba(147, 197, 253, 0.14)'),
      '--dsw-alias-border-l2': pair('rgba(147, 197, 253, 0.22)'),
      '--dsw-alias-border-l3': pair('rgba(147, 197, 253, 0.28)'),
      '--dsw-alias-border-l2-darkmode-thin': pair('rgba(147, 197, 253, 0.16)'),

      // Brand / primary interactions
      '--dsw-alias-brand-primary': pair('#93C5FD'),
      '--dsw-alias-brand-text': pair('#e2e8f0'),
      '--dsw-alias-label-primary': pair('#F8FAFC'),
      '--dsw-alias-label-primary-dimmed': pair('#A5B4FC'),
      '--dsw-alias-label-secondary': pair('#CBD5E1'),
      '--dsw-alias-label-tertiary': pair('#93C5FD'),
      '--dsw-alias-label-caption': pair('#94A3B8'),

      // Buttons
      '--dsw-alias-button-info-fill': pair('#93C5FD'),
      '--dsw-alias-button-info-hover': pair('#7CAEFD'),
      '--dsw-alias-button-primary-fill': pair('#93C5FD'),
      '--dsw-alias-button-primary-hover': pair('#7CAEFD'),
      '--dsw-alias-button-primary-dimmed': pair('rgba(147, 197, 253, 0.18)'),
      '--dsw-alias-button-elevated-fill': pair('rgba(255, 255, 255, 0.08)'),
      '--dsw-alias-button-floating-fill': pair('rgba(255, 255, 255, 0.10)'),
      '--dsw-alias-button-floating-hover': pair('rgba(255, 255, 255, 0.15)'),
      '--dsw-alias-button-ghost-active-border': pair('rgba(147, 197, 253, 0.5)'),
      '--dsw-alias-button-ghost-active-fill': pair('rgba(147, 197, 253, 0.16)'),
      '--dsw-alias-button-ghost-active-hover': pair('rgba(147, 197, 253, 0.22)'),
      '--dsw-alias-button-tool-bar-fill': pair('rgba(255, 255, 255, 0.10)'),
      '--dsw-alias-button-tool-bar-hover': pair('rgba(255, 255, 255, 0.15)'),

      // Interactive states
      '--dsw-alias-interactive-bg-hover': pair('rgba(255, 255, 255, 0.08)'),
      '--dsw-alias-interactive-bg-hover-accent': pair('rgba(147, 197, 253, 0.20)'),
      '--dsw-alias-interactive-bg-active': pair('rgba(147, 197, 253, 0.16)'),
      '--dsw-alias-interactive-bg-hover-danger': pair('rgba(248, 113, 113, 0.12)'),

      // Markdown / code
      '--dsw-alias-markdown-inline-code': pair('rgba(147, 197, 253, 0.12)'),
      '--dsw-alias-markdown-code-block': pair('rgba(13, 17, 23, 0.55)'),
      '--dsw-alias-markdown-code-block-banner': pair('rgba(147, 197, 253, 0.08)'),
      '--dsw-alias-markdown-tag': pair('rgba(147, 197, 253, 0.10)'),
      '--dsw-alias-markdown-citation': pair('rgba(147, 197, 253, 0.10)'),
      '--dsw-alias-markdown-code-segment-unselected': pair('rgba(255, 255, 255, 0.06)'),
      '--dsw-alias-markdown-code-segment-selected': pair('rgba(147, 197, 253, 0.20)'),
      '--dsw-alias-markdown-placeholder': pair('rgba(255, 255, 255, 0.05)'),

      // Status colors
      '--dsw-alias-state-business-primary': pair('#93C5FD'),
      '--dsw-alias-state-business-tertiary': pair('rgba(147, 197, 253, 0.14)'),
      '--dsw-alias-state-error-primary': pair('#F87171'),
      '--dsw-alias-state-error-secondary': pair('#FCA5A5'),
      '--dsw-alias-state-error-tertiary': pair('rgba(248, 113, 113, 0.14)'),
      '--dsw-alias-state-success-primary': pair('#7FE0C8'),
      '--dsw-alias-state-success-tertiary': pair('rgba(127, 224, 200, 0.14)'),
      '--dsw-alias-state-warn-primary': pair('#FBBF24'),
      '--dsw-alias-state-warn-secondary': pair('#FCD34D'),
      '--dsw-alias-state-warn-tertiary': pair('rgba(251, 191, 36, 0.14)'),

      // Component-specific (sidebar, bubble, menu, input card, tip)
      '--dsw-specific-sidebar-fill': pair('rgba(15, 23, 42, 0.42)'),
      '--dsw-specific-sidebar-nav-item-hover': pair('rgba(255, 255, 255, 0.08)'),
      '--dsw-specific-sidebar-nav-item-active': pair('rgba(147, 197, 253, 0.16)'),
      '--dsw-specific-sidebar-nav-item-active-accent': pair('rgba(147, 197, 253, 0.85)'),
      '--dsw-specific-bubble': pair('rgba(15, 23, 42, 0.75)'),
      '--dsw-specific-input-major': pair('rgba(15, 23, 42, 0.85)'),
      '--dsw-specific-tip': pair('rgba(13, 17, 23, 0.75)'),
      '--dsw-specific-menu': pair('rgba(37, 58, 125, 0.94)'),
      '--dsw-specific-selector': pair('rgba(255, 255, 255, 0.10)'),

      // Scrollbars
      '--dsw-alias-scrollbar-bg-l2': pair('rgba(147, 197, 253, 0.32)'),
      '--dsw-alias-scrollbar-hover-l2': pair('rgba(147, 197, 253, 0.55)'),

      // Shadows
      '--dsw-shadow-lv2': pair('0 8px 24px rgba(0, 0, 0, 0.28)'),
    });
    ctx.effect(() => dispose);

    // ── 2) One <style> block, STABLE selectors only ───────────────────────
    // Deep-space backdrop: a dark indigo/blue radial gradient, so it works with
    // NO asset served by the host half. Swap the background-image for a
    // wallpaper URL if you want a photo backdrop — but keep the selectors stable.
    const disposeStyle = styles.insert(`
html { background-color: transparent !important; }
body {
  background-color: #0a0e1a !important;
  background-image:
    linear-gradient(180deg, rgba(4,7,18,0.12) 0%, rgba(8,11,28,0.06) 45%, rgba(14,8,26,0.10) 100%),
    url('/deepspace-bg/wallpaper.jpg') !important;
  background-attachment: fixed, fixed !important;
  background-size: cover, cover !important;
  background-position: center, center !important;
  background-repeat: no-repeat, no-repeat !important;
  -webkit-font-smoothing: antialiased !important;
  text-rendering: optimizeLegibility !important;
}
body[data-ds-dark-theme] {
  background-image:
    linear-gradient(180deg, rgba(4,7,18,0.12) 0%, rgba(8,11,28,0.06) 45%, rgba(14,8,26,0.10) 100%),
    url('/deepspace-bg/wallpaper.jpg') !important;
  color-scheme: dark !important;
}
/* Deep-space glass scrollbars — stable (no hash classes). Match what the base
   theme already does, but give it the comet-blue treat. */
* { scrollbar-width: thin !important; }
*::-webkit-scrollbar { width: 9px !important; height: 9px !important; }
*::-webkit-scrollbar-thumb {
  background: rgba(147, 197, 253, 0.40) !important;
  border: 2px solid rgba(15, 23, 42, 0.60) !important;
  border-radius: 6px !important;
  background-clip: padding-box !important;
}
*::-webkit-scrollbar-thumb:hover { background: rgba(147, 197, 253, 0.62) !important; }
*::-webkit-scrollbar-track { background: transparent !important; }
*::-webkit-scrollbar-corner { background: transparent !important; }
/* Full banner, proportional, centered. Use the currently-stable .hHd-Xa_* classes for layout centering only. */
.hHd-Xa_brand { justify-content: center !important; padding: 0 14px !important; }
.hHd-Xa_brandIdentity { justify-content: center !important; height: auto !important; }
.hHd-Xa_brandMark { width: 100% !important; justify-content: center !important; }
.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_logoRow { height: auto !important; }
.hHd-Xa_collapsed .hHd-Xa_brandMark img { height: 22px !important; width: auto !important; }
`);
    ctx.effect(() => disposeStyle);

    // Tag the document so the author can scope any further (stable) CSS under
    // this attribute instead of relying on hash class names.
    document.documentElement.setAttribute('data-deepspace-theme', 'on');
    ctx.effect(() => () => document.documentElement.removeAttribute('data-deepspace-theme'));

    // ── 3) Override the top-left sidebar brand (whale + wordmark) ─────────
    // Done via the STABLE `sidebar.brand.mark` / `sidebar.brand.name` slots.
    // The built bundle pulls in `react/jsx-runtime`; raw-source runs degrade
    // gracefully when `require` (and thus React) is unavailable.
    const slots = ctx.get('slots');
    const jsxRuntime = typeof require === 'function'
      ? (() => { try { return require('react/jsx-runtime'); } catch (e) { return null; } })()
      : null;
    if (slots && jsxRuntime) {
      const BrandMark = ({ size }) => jsxRuntime.jsx('img', {
        src: '/deepspace-bg/brand.png',
        alt: 'brand',
        style: { width: '100%', height: 'auto', maxHeight: 220, objectFit: 'contain', display: 'block' },
      });
      const BrandName = () => null;
      slots.inject('sidebar.brand.mark', () =>
        slots.inject('sidebar.brand.name', function* () {
          yield slots.register({ name: 'sidebar.brand.mark' }, BrandMark);
          yield slots.register({ name: 'sidebar.brand.name' }, BrandName);
        })
      );
    }
  },
};
