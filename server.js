const express = require("express");
const server = express();
const krabs = require("krabs").default;
const dev = process.env.NODE_ENV !== "production";
const CachedHandler = require("next-boost").default;
const args = { dir: ".", dev };

const main = async () => {
  try {
    const app = require("next")(args);
    await app.prepare();

    const devHandler = app.getRequestHandler();

    const script = require.resolve("./init");
    const cached = await CachedHandler({ script, args });
    const cachedHandler = cached.hanler;

    console.log(cachedHandler);

    server
      .get("*", (req, res) => {
        if (!dev && req.headers["x-forwarded-proto"] === "http") {
          res.redirect("https://" + req.headers.host + req.url);
        }

        return krabs(req, res, dev ? devHandler : cachedHandler, app);
      })
      .listen(process.env.PORT || 3000, () =>
        console.log(`Server is ready on port ${process.env.PORT || 3000}.`)
      );
  } catch (err) {
    console.log(err.stack);
  }
};

main();
