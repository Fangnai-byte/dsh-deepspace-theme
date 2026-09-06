// dsh-deepspace-theme — browser half of the bundle.
// Registered with the web module loader via the package's ./client export; the
// cordis loader adopts `exports` (apply/inject) as the plugin object.
// Delivers: comet-blue / indigo glass token layer + a stable-selector backdrop
// and scrollbar stylesheet. NO build-time hash class names, so it survives dsh
// frontend upgrades. Every side effect is registered through ctx.effect so
// disable/remove fully reverts the page.
window.__ModuleLoader__.load({
  id: 'dsh-deepspace-theme',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

    const react_jsx_runtime = require('react/jsx-runtime');

    const inject = ['theme', 'slots'];

    const apply = (ctx) => {
      const pair = (v) => ({ light: v, dark: v });

      const dispose = ctx.theme.overrideTokens('deepspace', {
        '--dsw-alias-bg-base': pair('rgba(5, 8, 20, 0)'),
        '--dsw-alias-bg-layer-1': pair('rgba(15, 23, 42, 0.75)'),
        '--dsw-alias-bg-layer-2': pair('rgba(15, 23, 42, 0.80)'),
        '--dsw-alias-bg-layer-3': pair('rgba(15, 23, 42, 0.85)'),
        '--dsw-alias-bg-overlay': pair('rgba(10, 14, 26, 0.90)'),
        '--dsw-alias-bg-module-platform': pair('rgba(255, 255, 255, 0.08)'),
        '--dsw-alias-bg-multi-select': pair('rgba(147, 197, 253, 0.15)'),
        '--dsw-alias-border-l1': pair('rgba(147, 197, 253, 0.14)'),
        '--dsw-alias-border-l2': pair('rgba(147, 197, 253, 0.22)'),
        '--dsw-alias-border-l3': pair('rgba(147, 197, 253, 0.28)'),
        '--dsw-alias-border-l2-darkmode-thin': pair('rgba(147, 197, 253, 0.16)'),
        '--dsw-alias-brand-primary': pair('#93C5FD'),
        '--dsw-alias-brand-text': pair('#e2e8f0'),
        '--dsw-alias-label-primary': pair('#F8FAFC'),
        '--dsw-alias-label-primary-dimmed': pair('#A5B4FC'),
        '--dsw-alias-label-secondary': pair('#CBD5E1'),
        '--dsw-alias-label-tertiary': pair('#93C5FD'),
        '--dsw-alias-label-caption': pair('#94A3B8'),
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
        '--dsw-alias-interactive-bg-hover': pair('rgba(255, 255, 255, 0.08)'),
        '--dsw-alias-interactive-bg-hover-accent': pair('rgba(147, 197, 253, 0.20)'),
        '--dsw-alias-interactive-bg-active': pair('rgba(147, 197, 253, 0.16)'),
        '--dsw-alias-interactive-bg-hover-danger': pair('rgba(248, 113, 113, 0.12)'),
        '--dsw-alias-markdown-inline-code': pair('rgba(147, 197, 253, 0.12)'),
        '--dsw-alias-markdown-code-block': pair('rgba(13, 17, 23, 0.55)'),
        '--dsw-alias-markdown-code-block-banner': pair('rgba(147, 197, 253, 0.08)'),
        '--dsw-alias-markdown-tag': pair('rgba(147, 197, 253, 0.10)'),
        '--dsw-alias-markdown-citation': pair('rgba(147, 197, 253, 0.10)'),
        '--dsw-alias-markdown-code-segment-unselected': pair('rgba(255, 255, 255, 0.06)'),
        '--dsw-alias-markdown-code-segment-selected': pair('rgba(147, 197, 253, 0.20)'),
        '--dsw-alias-markdown-placeholder': pair('rgba(255, 255, 255, 0.05)'),
        '--dsw-alias-state-error-primary': pair('#F87171'),
        '--dsw-alias-state-error-secondary': pair('#FCA5A5'),
        '--dsw-alias-state-error-tertiary': pair('rgba(248, 113, 113, 0.14)'),
        '--dsw-alias-state-success-primary': pair('#7FE0C8'),
        '--dsw-alias-state-success-tertiary': pair('rgba(127, 224, 200, 0.14)'),
        '--dsw-alias-state-warn-primary': pair('#FBBF24'),
        '--dsw-alias-state-warn-secondary': pair('#FCD34D'),
        '--dsw-alias-state-warn-tertiary': pair('rgba(251, 191, 36, 0.14)'),
        '--dsw-alias-state-business-primary': pair('#93C5FD'),
        '--dsw-alias-state-business-tertiary': pair('rgba(147, 197, 253, 0.14)'),
        '--dsw-specific-sidebar-fill': pair('rgba(15, 23, 42, 0.42)'),
        '--dsw-specific-sidebar-nav-item-hover': pair('rgba(255, 255, 255, 0.08)'),
        '--dsw-specific-sidebar-nav-item-active': pair('rgba(147, 197, 253, 0.16)'),
        '--dsw-specific-sidebar-nav-item-active-accent': pair('rgba(147, 197, 253, 0.85)'),
        '--dsw-specific-bubble': pair('rgba(15, 23, 42, 0.75)'),
        '--dsw-specific-input-major': pair('rgba(15, 23, 42, 0.85)'),
        '--dsw-specific-tip': pair('rgba(13, 17, 23, 0.75)'),
        '--dsw-specific-menu': pair('rgba(37, 58, 125, 0.94)'),
        '--dsw-specific-selector': pair('rgba(255, 255, 255, 0.10)'),
        '--dsw-alias-scrollbar-bg-l2': pair('rgba(147, 197, 253, 0.32)'),
        '--dsw-alias-scrollbar-hover-l2': pair('rgba(147, 197, 253, 0.55)'),
        '--dsw-shadow-lv2': pair('0 8px 24px rgba(0, 0, 0, 0.28)'),
      });
      ctx.effect(() => dispose);

      const styleEl = document.createElement('style');
      styleEl.id = 'deepspace-theme';
      styleEl.setAttribute('data-plugin', 'dsh-deepspace-theme');
      styleEl.textContent = `html { background-color: transparent !important; }
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
.hHd-Xa_collapsed .hHd-Xa_brandMark img { height: 22px !important; width: auto !important; }`;
      document.head.append(styleEl);
      ctx.effect(() => () => styleEl.remove());

      document.documentElement.setAttribute('data-deepspace-theme', 'on');
      ctx.effect(() => () => document.documentElement.removeAttribute('data-deepspace-theme'));

      // ── 3) Override the top-left sidebar brand (whale + wordmark) ─────────
      // The official build fills `sidebar.brand.mark` (FishLogo) and
      // `sidebar.brand.name` (BrandWordmark). We register our own components for
      // the same slot names (registered later => wins) to show the custom banner
      // logo and drop the default wordmark. Hash-free — slot names are stable.
      const BrandMark = ({ size }) => react_jsx_runtime.jsx('img', {
        src: '/deepspace-bg/brand.png',
        alt: 'brand',
        style: { width: '100%', height: 'auto', maxHeight: 220, objectFit: 'contain', display: 'block' },
      });
      const BrandName = () => null;
      ctx.slots.inject('sidebar.brand.mark', () =>
        ctx.slots.inject('sidebar.brand.name', function* () {
          yield ctx.slots.register({ name: 'sidebar.brand.mark' }, BrandMark);
          yield ctx.slots.register({ name: 'sidebar.brand.name' }, BrandName);
        })
      );
    };

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
