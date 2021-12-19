// webpack.common.js
const path = require("path");
module.exports = {
	entry: {
		index: "./src/Index.jsx",
	},
	output: {
		// `filename` provides a template for naming your bundles (remember to use `[name]`)
		filename: "[name].bundle.js",
		// `chunkFilename` provides a template for naming code-split bundles (optional)
		chunkFilename: "[name].bundle.js",
		// `path` is the folder where Webpack will place your bundles
		path: __dirname + "/public/bundles",
		// `publicPath` is where Webpack will load your bundles from (optional)
		publicPath: "bundles/",
	},
	optimization: {
		splitChunks: {
			// chunks: "async", // all, async, and initial
			chunks: "all", // all, async, and initial
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.bundle\.js$/,
				use: "bundle-loader",
			},
		],
	},
	// 	modules: [path.resolve(__dirname, "app"), "node_modules"],
	resolve: {
		alias: {
			libs: path.resolve(__dirname, "src/libs/"),
			// components: path.resolve(__dirname, "src/components/"),
			actions: path.resolve(__dirname, "src/actions/"),
			sockets: path.resolve(__dirname, "src/sockets/"),
			sagas: path.resolve(__dirname, "src/sagas/"),
			reducers: path.resolve(__dirname, "src/reducers/"),
			constants: path.resolve(__dirname, "src/constants/"),
			features: path.resolve(__dirname, "src/features/"),
			// src: path.resolve(__dirname, "src/"),
			components: path.resolve(__dirname, "src/components/"),
			src: path.resolve(__dirname, "src/main/"),
			main: path.resolve(__dirname, "src/main/"),
			party: path.resolve(__dirname, "src/party/"),
			dj: path.resolve(__dirname, "src/dj/"),
			email: path.resolve(__dirname, "src/email/"),
			shared: path.resolve(__dirname, "../shared"),
			live: path.resolve(__dirname, "src/live/"),
		},
	},
	node: {
		fs: "empty",
	},
};