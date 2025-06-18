const getMode = env => {
  if (typeof env === 'string') return env;
  if (env && typeof env === 'object') {
    if (env.prod) return 'prod';
    if (env.dev) return 'dev';
  }
  return 'dev';
};

module.exports = env => {
  const mode = getMode(env);
  console.log(`🛠️  running ${mode} Mode using ./webpack/webpack.${mode}.js 🛠️`);
  return require(`./webpack/webpack.${mode}.js`);
};