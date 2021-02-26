module.exports = {
<<<<<<< HEAD
  entry: ["./main.js", "./animation-demo.js"],
=======
  mode: "development",
  entry: "./animation-demo.js",
>>>>>>> 8ec6f6d26e54f23a77126950d148142b222589c4
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "createElement" },
              ],
            ],
          },
        },
      },
    ],
  },
};
