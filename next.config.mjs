/** @type {import('next').NextConfig} */
const githubRepository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const isUserSite = githubRepository.endsWith(".github.io");
const basePath = isGithubPagesBuild && githubRepository && !isUserSite ? `/${githubRepository}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
