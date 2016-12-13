
var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var parentDir = __dirname.match(/[^\\][a-zA-Z]+$/)[0] ;

module.exports = {
    //插件项
    // plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")],
    plugins: [
        new ExtractTextPlugin(parentDir+".all.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings : false
            },
            sourceMap : false
        })
    ],
    //页面入口文件配置
    entry: {
        index : './src/release/index.js'
    },
    //入口文件输出配置
    output: {
        path: './build',
        filename: parentDir+".all.js"
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass')},
            // { test: /\.scss$/, loader:  'css!sass'},
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test : /\.html|tpl|xtpl$/, loader : "html?-minimize"}
        ]
    },
    // //其它解决方案配置
    // resolve: {
    //     root: 'E:/github/flux-example/src', //绝对路径
    //     extensions: ['', '.js', '.json', '.scss'],
    //     alias: {
    //         AppStore : 'js/stores/AppStores.js',
    //         ActionType : 'js/actions/ActionType.js',
    //         AppAction : 'js/actions/AppAction.js'
    //     }
    // }
};