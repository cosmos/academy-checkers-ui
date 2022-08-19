require("dotenv").config()
const webpack = require("webpack")

module.exports = function override(config, env) {
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
        new webpack.EnvironmentPlugin(["RPC_URL"]),
        new webpack.EnvironmentPlugin(["REST_URL"]),
    )
    config.resolve.fallback = {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
    }
    return config
}
