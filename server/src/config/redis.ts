import { createClient } from 'redis'
import { config } from './environment'

const redis = createClient({
  url: config.redisUrl
})

redis.on('error', (err) => console.log('Redis Client Error', err))

export default redis