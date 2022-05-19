const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

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
                // {
                //     test: /\.(svg|png|jpg|jpeg|gif|bmp|tiff)$/i,
                //     use: [
                //       {
                //         loader: 'url-loader',
                //         options: {
                //           limit: 8192,
                //         },
                //       },
                //     ],
                //   },
                ...rule.oneOf
            ]
        };
    }

    return rule;
});

    return config;
};

// //override react-app hidden webpack config to remove hash in all files
// //this is to fix a bug on file hash generated differently between local and DevOps
// //causing most icons not able to load correctly results in missing icons in loaded diagrams
// module.exports = function override(config, env) {
//     if (env !== "production") {
//         return config;
//     }

//     // //JS Overrides
//     // config.output.filename = 'static/js/[name].js';
//     // config.output.chunkFilename = 'static/js/[name].chunk.js';

//     // //CSS Overrides
//     // config.plugins[4].filename = 'static/css/[name].css';

//     // //Media and Assets Overrides
//     // config.module.rules[1].oneOf?[0].options.name = 'static/media/[name].[ext]';
//     // // config.module.rules[1].oneOf?[3].options.name = 'static/media/[name].[ext]';

//     //working well
//     //Get rid of hash for js files
//     // config.output.filename = "static/js/[name].[hash:8].js"
//     // config.output.chunkFilename = "static/js/[name].chunk.[hash:8].js"

//     // // Get rid of hash for css files
//     // const miniCssExtractPlugin = config.plugins.find(element => element.constructor.name === "MiniCssExtractPlugin");
//     // miniCssExtractPlugin.options.filename = "static/css/[name].[hash:8].css"
//     // miniCssExtractPlugin.options.chunkFilename = "static/css/[name].[hash:8].css"

//     config.module.rules = config.module.rules.map(rule => {
//         if (rule.oneOf instanceof Array) {
//             return {
//                 ...rule,
//                 oneOf: [
//                     {
//                         test: /\.(svg|png|jpg|jpeg|gif|bmp|tiff)$/i,
//                         use: [
//                             {
//                                 loader: 'file-loader',
//                                 options: {
//                                     name: 'static/media/[name].[ext]'
//                                 }
//                             }
//                         ]
//                     },
//                     // {
//                     //     test: /\.(svg|png|jpg|jpeg|gif|bmp|tiff)$/i,
//                     //     use: [
//                     //       {
//                     //         loader: 'url-loader',
//                     //         options: {
//                     //           limit: 8192,
//                     //         },
//                     //       },
//                     //     ],
//                     //   },
//                     ...rule.oneOf
//                 ]
//             };
//         }

//         return rule;
//     });


//     return config;
// };