/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disables React Strict Mode

    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"raw.githubusercontent.com"
            }
        ]
    }
};
  
export default nextConfig;
