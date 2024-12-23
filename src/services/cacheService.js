const NodeCache = require('node-cache');

// Cache with 5 minute TTL
const cache = new NodeCache({ stdTTL: 300 });

function getCached(key) {
  return cache.get(key);
}

function setCached(key, value) {
  cache.set(key, value);
}

function clearCache(pattern) {
  const keys = cache.keys();
  keys.forEach(key => {
    if (pattern.test(key)) {
      cache.del(key);
    }
  });
}

module.exports = {
  getCached,
  setCached,
  clearCache
};