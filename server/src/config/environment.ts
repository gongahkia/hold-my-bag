import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  jwtSecret: process.env.JWT_SECRET!,
}

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required')
}

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required')
}