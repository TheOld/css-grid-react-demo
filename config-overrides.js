const rewireStyledComponents = require('react-app-rewire-styled-components');
const rewireEslint = require('react-app-rewire-eslint');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireEslint(config, env, overrideEslintOptions);

  return config;
}
