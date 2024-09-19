const nextConfig = {
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://richinfo.co https://cdn.carbonads.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://accounts.google.com https://www.gstatic.com; connect-src 'self' https://richinfo.co https://cdn.carbonads.com https://*.googleapis.com https://pagead2.googlesyndication.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; frame-src 'self' https://googleads.g.doubleclick.net https://accounts.google.com;"
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;