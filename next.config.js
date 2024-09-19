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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://richinfo.co https://cdn.carbonads.com https://pagead2.googlesyndication.com https://accounts.google.com https://www.gstatic.com; connect-src 'self' https://richinfo.co https://cdn.carbonads.com https://*.googleapis.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline';"
          }
        ],
      },
    ];
  },
};