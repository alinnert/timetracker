import type { Duration } from 'date-fns'

export function absDuration(duration: Duration): Duration {
  const result: Duration = {}
  const entries = Object.entries(duration)

  for (const [key, value] of entries) {
    result[key as keyof Duration] = Math.abs(value)
  }

  return result
}
