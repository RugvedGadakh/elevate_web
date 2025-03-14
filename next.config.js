/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/home-17",
      },
      {
        source: "/resumebuilder",
        destination: "/resume-builder",
      },
      {
        source: "/myprofile",
        destination: "/candidates-dashboard/my-profile",
      },
    ];
  },
};

module.exports = nextConfig;
