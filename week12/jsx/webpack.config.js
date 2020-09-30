module.exports = {
  mode: "development",
  entry: "./animation-demo.js",
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
        }
      }
    }]
  }
}
