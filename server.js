const express = require("express");
const krabs = require("krabs").default;
const dev = process.env.NODE_ENV !== "production";
const CachedHandler = require("next-boost").default;
const next = require("next");
const args = { dir: ".", dev };
const app = next(args);

const main = async () => {
  try {
    await app.prepare();

    const handler = app.getRequestHandler();

    const cached = await CachedHandler({ handler, args });

    console.log(cached);

    const server = express();

    server
      .get("*", (req, res) => {
        if (req.headers["x-forwarded-proto"] === "http") {
          res.redirect("https://" + req.headers.host + req.url);
        }

        return krabs(req, res, handler, dev ? handler : cached);
      })
      .listen(process.env.PORT || 3000, () =>
        console.log(`Server is ready on port ${process.env.PORT || 3000}.`)
      );
  } catch (err) {
    console.log(err.stack);
  }
};

main();
