/** @type {import('next').NextConfig} */

// Public catalog pages look the same for every visitor, so let Netlify serve them
// from its cache instead of running a function (and calling the API) per request.
// Netlify refreshes them in the background, so visitors never wait for it.
const pageCache = [
  {
    key: "Netlify-CDN-Cache-Control",
    value: "public, durable, s-maxage=300, stale-while-revalidate=86400",
  },
  { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
];

// Photos and brand assets rarely change, and a deploy publishes new content anyway.
const assetCache = [
  { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
];

const nextConfig = {
  async headers() {
    return [
      { source: "/", headers: pageCache },
      { source: "/products", headers: pageCache },
      { source: "/products/:slug", headers: pageCache },
      { source: "/about", headers: pageCache },
      { source: "/contact", headers: pageCache },
      { source: "/testimonials", headers: pageCache },
      { source: "/images/:path*", headers: assetCache },
      { source: "/brand/:path*", headers: assetCache },
    ];
  },
};

export default nextConfig;
