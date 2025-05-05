const Redis = require('ioredis');
const logger = require('./logger');

const config = require('./config');
const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

redis.on('connect', () => {
  logger.info(' Connected to RedisB');

});

redis.on('error', (err) => {
  logger.error('❌ Redis error:', err);
});

module.exports = redis;
