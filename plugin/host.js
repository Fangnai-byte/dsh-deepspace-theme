// dsh-deepspace-theme — host (server) half (source form).
// Serves the assets the browser half's stylesheet references:
//   /deepspace-bg/wallpaper.jpg   main backdrop
//   /deepspace-bg/brand.png       top-left sidebar brand logo
// Source form uses the injected `fs` / `webServer` services and a path
// placeholder (like kimino's source host.js). The built ESM bundle
// (bundle/host.js) resolves the same files via import.meta.url.
return {
  apply(ctx) {
    const fs = ctx.get('fs');
    const webServer = ctx.get('webServer');
    if (fs === undefined || webServer === undefined) return;

    // Absolute path of this theme's assets/ dir. Replace <THEME_DIR> with the
    // package dir, or leave it for the bundled host to resolve via import.meta.url.
    const assetsDir = '<THEME_DIR>/assets';

    const routes = [
      { path: '/deepspace-bg/wallpaper.jpg', file: 'wallpaper.jpg', type: 'image/jpeg' },
      { path: '/deepspace-bg/brand.png', file: 'brand.png', type: 'image/png' },
    ];
    for (const route of routes) {
      let dispose;
      try {
        dispose = webServer.register({
          kind: 'exact',
          path: route.path,
          handler: async (req, res) => {
            try {
              const target = await fs.resolve(`${assetsDir}/${route.file}`);
              const bytes = await fs.readBytes(target, undefined, 16 * 1024 * 1024);
              res.writeHead(200, {
                'Content-Type': route.type,
                'Content-Length': bytes.length,
                'Cache-Control': 'public, max-age=3600',
              });
              res.end(bytes);
            } catch (err) {
              console.error(`[deepspace-theme] asset route failed: ${route.path}`, err);
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('deepspace asset not found');
            }
          },
        });
      } catch (e) {
        console.warn(`[deepspace-theme] route ${route.path} already served, skipping:`, e?.message ?? e);
        dispose = () => {};
      }
      ctx.effect(() => dispose);
    }
  },
};
