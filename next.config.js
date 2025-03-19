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
        source: '/_next/static/chunks/870.1cf5f10c8827c183.js',
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
