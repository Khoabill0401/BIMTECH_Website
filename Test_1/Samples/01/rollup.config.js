import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "Test_1\Samples\01\app.js",
  output: [
    {
      format: "esm",
      file: "Test_1\Samples\01\bundle.js",
    },
  ],
  plugins: [resolve()],
};