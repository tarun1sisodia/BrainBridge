import { Redis } from '@upstash/redis';

let redisClient;

export const connectRedis = async () => {
  redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  console.log('Upstash Redis connected (initialized) successfully');
};

export const getRedisClient = () => redisClient;
