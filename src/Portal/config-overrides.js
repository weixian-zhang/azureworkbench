//override react-app hidden webpack config to remove hash in all files
//this is to fix a bug on file hash generated differently between local and DevOps
//causing most icons not able to load correctly results in missing icons in loaded diagrams
module.exports = function override(config, env) {
    if (env !== "production") {
        return config;
    }

    //Get rid of hash for js files
    config.output.filename = "static/js/[name].js"
    config.output.chunkFilename = "static/js/[name].chunk.js"

    // Get rid of hash for css files
    const miniCssExtractPlugin = config.plugins.find(element => element.constructor.name === "MiniCssExtractPlugin");
    miniCssExtractPlugin.options.filename = "static/css/[name].css"
    miniCssExtractPlugin.options.chunkFilename = "static/css/[name].css"

    config.module.rules = config.module.rules.map(rule => {
        if (rule.oneOf instanceof Array) {
            return {
                ...rule,
                oneOf: [
                    {
                        test: /\.(svg|png|jpg|jpeg|gif|bmp|tiff)$/i,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'static/media/[name].[ext]'
                                }
                            }
                        ]
                    },
                    ...rule.oneOf
                ]
            };
        }

        return rule;
    });

    // Get rid of hash for media files
    // config.module.rules[1].oneOf?.forEach(oneOf => {
    //     // if (!oneOf.options ||  oneOf.options.name !== "static/media/[name].[contenthash].[ext]") {
    //     //     return;
    //     // }
    //     oneOf.options.name = "static/media/[name].[ext]"
    // });

    return config;
};