import { addDurations } from '@/lib/date-fns/addDuration'
import { subtractDuration } from '@/lib/date-fns/subtractDuration'
import { sortDates } from '@/lib/date/sortDates'
import { sumTimestamps, type SumTimestampsResult } from '@/lib/sys/times'
import { add, intervalToDuration, isSameDay, isToday } from 'date-fns'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

export type DayInfo = SumTimestampsResult & { timestampsCount: number }

const timestampsStorageKey = 'timetracker:timestamps'
const storedTimestamps = (
  JSON.parse(localStorage.getItem(timestampsStorageKey) ?? '[]') as number[]
).map((timestamp) => new Date(timestamp))

export const useTimesStore = defineStore('times', () => {
  const timestamps = ref<Date[]>(storedTimestamps)
  const currentTime = ref<Date>(new Date())
  const importData = ref<number[]>([])

  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)

  watchEffect(() => {
    const serializedTimestamps = JSON.stringify(
      timestamps.value.map((timestamp) => timestamp.getTime()),
    )
    localStorage.setItem(timestampsStorageKey, serializedTimestamps)
  })

  const allDays = computed((): Date[] => {
    const days: Date[] = []

    for (const timestamp of timestamps.value) {
      if (!days.some((day) => isSameDay(day, timestamp))) {
        days.push(new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate()))
      }
    }

    days.sort(sortDates())

    const today = new Date(
      currentTime.value.getFullYear(),
      currentTime.value.getMonth(),
      currentTime.value.getDate(),
    )

    if (!isSameDay(days[0], today)) {
      days.unshift(today)
    }

    return days
  })

  const selectedDay = ref<Date>(new Date())

  const selectedDayIsToday = computed((): boolean => {
    return isSameDay(currentTime.value, selectedDay.value)
  })

  const timestampsOfSelectedDay = computed((): Date[] => {
    const result = timestamps.value.filter((timestamp) => isSameDay(timestamp, selectedDay.value))
    result.sort(sortDates(true))
    return result
  })

  const workTimeOfSelectedDay = computed((): Duration => {
    const workTimeDurations: Duration[] = []

    const list = [...timestampsOfSelectedDay.value, currentTime.value]

    list.forEach((timestamp, index) => {
      if (index % 2 === 0) return
      workTimeDurations.push(
        intervalToDuration({ start: timestampsOfSelectedDay.value[index - 1], end: timestamp }),
      )
    })

    return addDurations(...workTimeDurations)
  })

  const breakTimeOfSelectedDay = computed((): Duration => {
    const breakTimeDurations: Duration[] = []

    const list = isSameDay(timestampsOfSelectedDay.value[0], new Date())
      ? [...timestampsOfSelectedDay.value, currentTime.value]
      : timestampsOfSelectedDay.value

    list.forEach((timestamp, index) => {
      if (index % 2 === 1 || index === 0) return

      breakTimeDurations.push(
        intervalToDuration({ start: timestampsOfSelectedDay.value[index - 1], end: timestamp }),
      )
    })

    return addDurations(...breakTimeDurations)
  })

  const remainingWorkTimeOfSelectedDay = computed((): Duration => {
    return subtractDuration({ hours: 8 }, workTimeOfSelectedDay.value)
  })

  const timeAfterRemainingWorkTimeOfSelectedDay = computed((): Date => {
    return add(currentTime.value, remainingWorkTimeOfSelectedDay.value)
  })

  return {
    currentTime,
    timestamps,
    allDays,
    selectedDay,
    selectedDayIsToday,
    timestampsOfSelectedDay,
    workTimeOfSelectedDay,
    breakTimeOfSelectedDay,
    remainingWorkTimeOfSelectedDay,
    timeAfterRemainingWorkTimeOfSelectedDay,
    importData,

    setSelectedDay(day: Date) {
      selectedDay.value = day
    },

    addTime(time: Date) {
      if (Number.isNaN(time.getTime())) return
      timestamps.value.push(time)
    },

    addCurrentTime() {
      this.addTime(new Date())
    },

    removeDate(time: Date) {
      if (!timestamps.value.includes(time)) return
      timestamps.value.splice(timestamps.value.indexOf(time), 1)
    },

    clearDates() {
      timestamps.value = []
    },

    getDayInfo(day: Date): DayInfo {
      const filteredTimestamps = timestamps.value.filter((time) => isSameDay(time, day))
      const timestampsCount = filteredTimestamps.length

      if (isToday(day)) {
        filteredTimestamps.push(currentTime.value)
      }

      return { ...sumTimestamps(filteredTimestamps), timestampsCount }
    },

    copyTimesToClipboard() {
      const data = localStorage.getItem(timestampsStorageKey)
      if (data === null) return
      navigator.clipboard.writeText(data)
    },

    importTimesFromClipboard() {
      navigator.clipboard.readText().then((data) => {
        try {
          const parsedData = JSON.parse(data)
          if (!Array.isArray(parsedData)) return
          const allAreNumbers = parsedData.every((item) => typeof item === 'number')
          if (!allAreNumbers) return
          importData.value = parsedData
        } catch (err) {
          console.error(err)
        }
      })
    },

    applyImport(replace = false) {
      const newTimestamps = importData.value.map((item) => new Date(item))

      if (replace) {
        timestamps.value = newTimestamps
      } else {
        timestamps.value.push(...newTimestamps)
      }

      importData.value = []
    },

    abortImport() {
      importData.value = []
    },
  }
})
