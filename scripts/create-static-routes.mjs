import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = 'dist';
const routes = ['privacy'];

await Promise.all(
  routes.map(async (route) => {
    const routeDir = join(outDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(join(outDir, 'index.html'), join(routeDir, 'index.html'));
  }),
);
