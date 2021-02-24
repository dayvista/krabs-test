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
      .get("*", (req, res) => {
        if (req.headers["x-forwarded-proto"] === "http") {
          res.redirect("https://" + req.headers.host + req.url);
        }

        return krabs(req, res, handle, app);
      })
      .listen(process.env.PORT || 3000, () =>
        console.log(`Server is ready on port ${process.env.PORT || 3000}.`)
      );
  } catch (err) {
    console.log(err.stack);
  }
};

main();
