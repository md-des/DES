//  enable runtime transpilation to use ES6/7 in node

var fs = require('fs');

var babelrc = fs.readFileSync(__dirname + '/.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
  config.ignore = function ignoreFn(filename) {
    return !!/node_modules/.test(filename);
  }
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);
