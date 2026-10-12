/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The Vouchers page became the Promo page.
      { source: "/vouchers", destination: "/promo", permanent: true },
    ];
  },
};

export default nextConfig;
