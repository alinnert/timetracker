import { addDurations } from '@/lib/date-fns/addDuration'
import { subtractDuration } from '@/lib/date-fns/subtractDuration'
import { intervalToDuration, isSameDay } from 'date-fns'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

const timestampsStorageKey = 'timetracker:timestamps'
const storedTimestamps = (
  JSON.parse(localStorage.getItem(timestampsStorageKey) ?? '[]') as number[]
).map((timestamp) => new Date(timestamp))

export const useTimesStore = defineStore('times', () => {
  const timestamps = ref<Date[]>(storedTimestamps)

  watchEffect(() => {
    const serializedTimestamps = JSON.stringify(
      timestamps.value.map((timestamp) => timestamp.getTime())
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

    return days
  })

  const selectedDay = ref<Date>(new Date())

  const timestampsOfSelectedDay = computed((): Date[] => {
    return timestamps.value.filter((timestamp) => isSameDay(timestamp, selectedDay.value))
  })

  const workTimeOfSelectedDay = computed((): Duration => {
    const workTimeDurations: Duration[] = []

    timestamps.value.forEach((timestamp, index) => {
      if (index % 2 === 0) return
      workTimeDurations.push(
        intervalToDuration({ start: timestamps.value[index - 1], end: timestamp })
      )
    })

    return addDurations(...workTimeDurations)
  })

  const breakTimeOfSelectedDay = computed((): Duration => {
    const breakTimeDurations: Duration[] = []

    timestamps.value.forEach((timestamp, index) => {
      if (index % 2 === 1 || index === 0) return

      breakTimeDurations.push(
        intervalToDuration({ start: timestamps.value[index - 1], end: timestamp })
      )
    })

    return addDurations(...breakTimeDurations)
  })

  const remainingWorkTimeOfSelectedDay = computed((): Duration => {
    return subtractDuration({ hours: 8 }, workTimeOfSelectedDay.value)
  })

  return {
    timestamps,
    allDays,
    selectedDay,
    timestampsOfSelectedDay,
    workTimeOfSelectedDay,
    breakTimeOfSelectedDay,
    remainingWorkTimeOfSelectedDay,
    setSelectedDay(day: Date) {
      selectedDay.value = day
    },
    addTime(time: Date) {
      timestamps.value.push(time)
      timestamps.value.sort()
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
    }
  }
})
