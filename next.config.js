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
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/static/chunks/_app-pages-browser_node_modules_:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, must-revalidate',
          },
        ],
      },
    ];
  },
};
