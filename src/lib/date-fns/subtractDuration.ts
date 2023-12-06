import { add, intervalToDuration, sub, type Duration } from 'date-fns'

export function subtractDuration(duration1: Duration, duration2: Duration): Duration {
  const baseDate = new Date(0)

  return intervalToDuration({ start: baseDate, end: sub(add(baseDate, duration1), duration2) })
}
