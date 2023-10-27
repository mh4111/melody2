/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    eslint: {
        ignoreDuringBuilds: true
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Match any API route
                // destination: 'http://3.38.169.202:8080/api/:path*', // Proxy to your backend server
                destination: 'http://localhost:8080/api/:path*',
            },
        ];
    },

    webpack(config, options) {
        config.module.rules.push({
            test: /\.(mp3)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '/assets/mp3/', // This sets the public path for your MP3 files
                    },
                },
            ],
        });

        return config;
    },
};