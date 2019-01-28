var path = require('path')
export default {
  treeShaking: true,
  define: {
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
      "target": "http://localhost:3055",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  alias: {
    components: path.join(__dirname, './src/components'),
    request: path.join(__dirname, './src/request'),
  },
  extraBabelPresets: [],
};
