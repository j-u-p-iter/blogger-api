import mongoose from 'mongoose';
import redis from 'redis';
import * as util from 'util';

const client = redis.createClient();

const getFromRedis = util.promisify(client.get).bind(client);
const originalExec = mongoose.Query.prototype.exec;

export const createCacheService = () => {
  const self = mongoose.Query.prototype;

  self.useCache = null;

  self.enableCache = function ({ user } = {}) {
    if (user && user.role === 'admin') {
      this.useCache = true;
    }

    return this;
  };

  self.cache = async function (...args) {
    const cacheKey = JSON.stringify({
      ...this.getQuery(),
      collectionName: this.mongooseCollection.name,
    });

    const cachedValue = await getFromRedis(cacheKey);

    if (cachedValue) {
      const cachedDoc = JSON.parse(cachedValue);

      const dataToResolve = Array.isArray(cachedDoc)
        ? cachedDoc.map(doc => this.model(doc))
        : this.model(cachedDoc);

      return Promise.resolve(dataToResolve);
    }

    const data = await originalExec.bind(this)(...args);

    client.set(cacheKey, JSON.stringify(data), 'EX', 86400);

    return Promise.resolve(data);
  };

  self.exec = async function (...args) {
    if (!this.useCache) {
      const data = await originalExec.bind(this)(...args);

      return Promise.resolve(data);
    }

    return this.cache(...args);
  };
};
