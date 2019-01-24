// ref: https://umijs.org/config/
var path = require('path')
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
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
  alias: {
    components: path.join(__dirname, './src/components'),
  },
  extraBabelPresets: [],
};
