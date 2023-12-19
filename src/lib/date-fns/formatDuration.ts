import type { Duration } from 'date-fns'

export function formatDuration(duration: Duration): string {
  const hours = (duration.hours ?? '0').toString().padStart(2, '0')
  const minutes = (duration.minutes ?? '0').toString().padStart(2, '0')
  return `${hours}:${minutes}h`
}
