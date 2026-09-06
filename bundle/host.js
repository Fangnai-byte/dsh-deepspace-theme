// dsh-deepspace-theme — host (server) half of the bundle.
// Serves the assets the browser half references:
//   /deepspace-bg/wallpaper.jpg   main backdrop
//   /deepspace-bg/brand.png       top-left sidebar brand logo
// Asset paths resolve relative to THIS file, so the bundle works from any
// clone/link location without editing constants.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const assets = join(here, '..', 'assets');

const ROUTES = [
  {
    path: '/deepspace-bg/wallpaper.jpg',
    file: join(assets, 'wallpaper.jpg'),
    type: 'image/jpeg',
  },
  {
    path: '/deepspace-bg/brand.png',
    file: join(assets, 'brand.png'),
    type: 'image/png',
  },
];

export default {
  inject: ['webServer'],
  apply(ctx) {
    let registered = 0;
    for (const route of ROUTES) {
      let dispose;
      try {
        dispose = ctx.webServer.register({
          kind: 'exact',
          path: route.path,
          handler: async (req, res) => {
            try {
              const bytes = await readFile(route.file);
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
        registered += 1;
      } catch (e) {
        console.warn(`[deepspace-theme] route ${route.path} already served elsewhere, skipping:`, e?.message ?? e);
        continue;
      }
      ctx.effect(() => dispose);
    }
    console.log(`[deepspace-theme] host half active (${registered}/${ROUTES.length} asset route registered)`);
  },
};
