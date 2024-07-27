/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.starlightcms.io',
        port: '',
        pathname: '/workspaces/foln/folndev/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/foln-dev.appspot.com/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source:
          '/_next/static/chunks/_app-pages-browser_node_modules_framer-motion_dist_es_index_mjs.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/chunks/_app-pages-browser_src_components_common_Video_index_tsx.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=20, must-revalidate',
          },
        ],
      },
    ];
  },
};
