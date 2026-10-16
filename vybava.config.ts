import { defineConfig } from './.vybava/config';

// Shared Výbava configuration for this repository — one section per applet.
// Evaluated by bun with the helpers vybava ships; .vybava/config.ts is their
// gitignored copy for editor types, written by `vybava config init`.
export default defineConfig({
  sync: {
    // vybava config setup: package-lock.json is npm's lockfile
    install: 'npm install',
  },
});
