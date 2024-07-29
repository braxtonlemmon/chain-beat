/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/address-lookup',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
