import type { Duration } from 'date-fns'

export function getDurationSign(duration: Duration): -1 | 0 | 1 {
  const values = Object.values(duration) as number[]
  const sum = values.reduce((sum, value) => sum + value, 0)

  if (sum < 0) {
    return -1
  }
  if (sum > 0) {
    return 1
  }
  return 0
}
