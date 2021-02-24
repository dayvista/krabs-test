const express = require("express");
const server = express();
const krabs = require("krabs").default;
const dev = process.env.NODE_ENV !== "production";
const CachedHandler = require("next-boost").default;
const args = { dir: ".", dev };

const main = async () => {
  try {
    const init = require("./init").default;
    const devHandler = await init(args);

    const script = require.resolve("./init");
    const initCache = await CachedHandler({ script, args });
    const cachedHandler = initCache.handler;

    server
      .get("*", (req, res) => {
        if (!dev && req.headers["x-forwarded-proto"] === "http") {
          res.redirect("https://" + req.headers.host + req.url);
        }

        return krabs(req, res, dev ? devHandler : cachedHandler, global.app);
      })
      .listen(process.env.PORT || 3000, () =>
        console.log(`Server is ready on port ${process.env.PORT || 3000}.`)
      );
  } catch (err) {
    console.log(err.stack);
  }
};

main();
