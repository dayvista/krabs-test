const express = require("express");
const krabs = require("krabs").default;
const dev = process.env.NODE_ENV !== "production";
const CachedHandler = require("next-boost").default;
const args = { dir: ".", dev };

const main = async () => {
  try {
    const init = require("./init").default;
    const script = require.resolve("./init");
    const cached = await CachedHandler({ script, args });

    const handler = dev ? await init(args) : cached.handler;

    const server = express();

    server
      .get("*", (req, res) => {
        if (req.headers["x-forwarded-proto"] === "http") {
          res.redirect("https://" + req.headers.host + req.url);
        }

        return krabs(req, res, handler, dev ? init : script);
      })
      .listen(process.env.PORT || 3000, () =>
        console.log(`Server is ready on port ${process.env.PORT || 3000}.`)
      );
  } catch (err) {
    console.log(err.stack);
  }
};

main();
