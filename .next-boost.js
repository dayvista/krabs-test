module.exports = {
  cache: {
    ttl: 3600,
    tbd: 3600 * 24 * 5,
  },
  cacheKey: (req) => (req.headers.host || "") + ":" + req.url,
};
