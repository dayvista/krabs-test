const init = async (args) => {
  global.app = require("next")(args);
  await app.prepare();
  return app.getRequestHandler();
};

exports.default = init;
