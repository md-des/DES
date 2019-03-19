var path = require('path')
export default {
  treeShaking: true,
  define: {
   
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'DES',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  proxy: {
    "/api": {
      "target": "http://localhost:3060",
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
