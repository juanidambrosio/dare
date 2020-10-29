const NodeCache = require('node-cache');
const cache = new NodeCache();

const saveInCache = (items, entity) => {
  if (items) {
    items.forEach(item => {
      cache.set(entity + item.id, item, 86400);
    });
  }
  return items;
};

const getItemById = id => {
  return cache.get(id);
};

const getAllFromCache = entity => {
  const keys = cache.keys().filter(key => key.slice(0,1) == entity);
  return keys.map(key => cache.get(key));
};

const getByIdFromCache = (id, entity) => {
  return getItemById(entity + id);
};

module.exports = {
  saveInCache,
  getAllFromCache,
  getByIdFromCache
};