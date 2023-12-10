import { add, type Duration } from 'date-fns'

export function getRatio(duration: Duration, compareDuration: Duration): number {
  const baseDate = new Date(0)
  const compareDate = add(baseDate, compareDuration)
  const date = add(baseDate, duration)
  return (1 / compareDate.getTime()) * date.getTime()
}
