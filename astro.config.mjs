// // // @ts-check
// // import { defineConfig } from 'astro/config';

// // // https://astro.build/config
// // export default defineConfig({});


// import { defineConfig } from 'astro/config';
// import react from '@astrojs/react';
// import sitemap from '@astrojs/sitemap';
// import node from '@astrojs/node';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   site: 'https://panchangseva.in',
//   integrations: [react(), sitemap()],
//   output: 'server',
//   adapter: node({ mode: 'standalone' }),
//   vite: {
//     plugins: [tailwindcss()],
//   },
// });


import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'hinduguidance.vercel.app',
  integrations: [react(), sitemap()],
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});