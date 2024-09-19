module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://richinfo.co https://cdn.carbonads.com; connect-src 'self' https://richinfo.co https://cdn.carbonads.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
        ],
      },
    ];
  },
};