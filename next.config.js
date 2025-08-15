/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  rewrites: () => [
    {
      destination:
        "https://book.naturstyrelsen.dk/includes/branding_files/shelterbooking/includes/inc_ajaxbookingplaces.asp",
      source: "/api",
    },
  ],
};

module.exports = nextConfig;
