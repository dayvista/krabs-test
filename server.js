const express = require("express");
const next = require("next");
const krabs = require("krabs").default;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const main = async () => {
  try {
    await app.prepare();

    const handle = app.getRequestHandler();
    const server = express();

    server
      .get("*", (req, res) => krabs(req, res, handle, app))
      .listen(3000, () => console.log("server ready"));
  } catch (err) {
    console.log(err.stack);
  }
};

main();
