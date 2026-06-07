import { defineConfig } from 'vite';
import { resolve, relative, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, 're-milz-main/milz2-site-detailed');

function htmlInputs(dir = rootDir, inputs = {}) {
  for (const item of readdirSync(dir)) {
    const fullPath = resolve(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      htmlInputs(fullPath, inputs);
      continue;
    }

    if (item.endsWith('.html')) {
      const name = relative(rootDir, fullPath).replace(/\\/g, '/').replace(/\.html$/, '');
      inputs[name] = fullPath;
    }
  }

  return inputs;
}

export default defineConfig({
  root: 're-milz-main/milz2-site-detailed',
  publicDir: resolve(__dirname, 're-milz-main/public'),
  build: {
    outDir: resolve(__dirname, 're-milz-main/dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs(),
    },
  },
});
