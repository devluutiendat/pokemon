/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'pokemon';
const nextConfig = {

    assetPrefix: isProd ? `/${repoName}/` : '',
    basePath: isProd ? `/${repoName}` : '',

    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"raw.githubusercontent.com",
                pathname:"/**"
            }
        ]
    }
};
  
export default nextConfig;
