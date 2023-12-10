import { intervalToDuration } from 'date-fns'
import { addDuration } from '../date-fns/addDuration'

export type SumTimestampsResult = {
  worktime: Duration
  break: Duration
}

export function sumTimestamps(timestamps: Date[]): SumTimestampsResult {
  const result: SumTimestampsResult = { worktime: {}, break: {} }

  timestamps.forEach((time, index, items) => {
    if (index === 0) return

    const previousTime = items[index - 1]
    const duration = intervalToDuration({ start: previousTime, end: time })
    const value: keyof SumTimestampsResult = index % 2 === 0 ? 'break' : 'worktime'

    result[value] = addDuration(result[value], duration)
  })

  return result
}
