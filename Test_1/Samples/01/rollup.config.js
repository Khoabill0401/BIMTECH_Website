import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-node-resolve";

export default {
  input: "Test_1\Samples\01\app.js",
  output: [
    {
      // format: "iife",
      format: "esm",
      file: "Test_1\Samples\01\bundle.js",
    },
  ],
  plugins: [resolve()],
  mode: 'development'
};