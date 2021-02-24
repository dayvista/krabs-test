const init = async (args) => {
  const app = require("next")(args);
  await app.prepare();
  return app.getRequestHandler();
};

exports.default = init;
