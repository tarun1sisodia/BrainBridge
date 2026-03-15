const { Redis } = require('@upstash/redis');

let redisClient;

const connectRedis = async () => {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  console.log('Upstash Redis connected (initialized) successfully');
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
