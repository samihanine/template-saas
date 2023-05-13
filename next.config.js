/** @type {import('next').NextConfig} */

const {
  withPlausibleProxy
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('next-plausible');

module.exports = withPlausibleProxy()({
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [{
        source: '/login',
        destination: '/signin',
        permanent: true,
      },
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
});