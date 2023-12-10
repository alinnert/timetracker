export function sortDates(dateA: Date, dateB: Date): number {
  return dateB.getTime() - dateA.getTime()
}