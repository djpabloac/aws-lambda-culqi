import Redis from "ioredis";
import { config } from ".";

export const DURATION_FIFTEEN_MINUTES = 15
export const DURATION_ONE_MINUTE = 1

const redis = new Redis({
  ...!config.redis.password ? {} : { password: config.redis.password },
  host: config.redis.host,
  port: config.redis.port,
})

interface RedisSetArgs<T> {
  key: string;
  value: T;
  minutes?: number;
}

export const close = async () => {
  await redis.quit()
}

export const set = async<T>({
  key,
  value,
  minutes = DURATION_ONE_MINUTE
}: RedisSetArgs<T>) => {
  const strValue = JSON.stringify(value)

  await redis.set(key, strValue, 'EX', minutes * 60)
}

export const get = async<T>(key: string): Promise<T | null> => {
  const data = await redis.get(key)

  if (!data) return null

  return JSON.parse(data) as T
}
