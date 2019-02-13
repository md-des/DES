var path = require('path')
export default {
  treeShaking: true,
  define: {
    // "process.env.host": '140.143.90.177',
    // "process.env.port": 9000,
    "process.env.host": 'localhost',
    "process.env.port": 9000,
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'myapp',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  proxy: {
    "/api": {
      "target": "http://127.0.0.1:3060",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  alias: {
    components: path.join(__dirname, './src/components'),
    request: path.join(__dirname, './src/request'),
    static: path.join(__dirname, './src/static'),
    utils: path.join(__dirname, './src/utils'),
  },
  extraBabelPresets: [],
};
