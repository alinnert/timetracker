export function sortDates(reverse = false): (dateA: Date, dateB: Date) => number {
  return (dateA, dateB) => {
    if (reverse) {
      return dateA.getTime() - dateB.getTime()
    }
    return dateB.getTime() - dateA.getTime()
  }
}
