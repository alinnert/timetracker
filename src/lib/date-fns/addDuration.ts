import { add, intervalToDuration, type Duration } from 'date-fns'

export function addDuration(duration1: Duration, duration2: Duration): Duration {
  const baseDate = new Date(0)

  return intervalToDuration({ start: baseDate, end: add(add(baseDate, duration1), duration2) })
}

export function addDurations(...durations: Duration[]): Duration {
  const initialDuration = intervalToDuration({ start: new Date(0), end: new Date(0) })
  return durations.reduce((sum, duration) => addDuration(sum, duration), initialDuration)
}
