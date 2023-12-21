<script setup lang="ts">
import { absDuration } from '@/lib/date-fns/absDuration'
import { formatDuration } from '@/lib/date-fns/formatDuration'
import { getDurationSign } from '@/lib/date-fns/getDurationSign'
import {
  ArrowTrendingDownIcon as ArrowTrendingDownIconSmall,
  ArrowTrendingUpIcon as ArrowTrendingUpIconSmall,
  FlagIcon as FlagIconSmall,
  TrophyIcon as TrophyIconSmall,
  PauseCircleIcon as PauseCircleIconSmall,
  PlayCircleIcon as PlayCircleIconSmall,
} from '@heroicons/vue/16/solid'
import {
  ArrowTrendingDownIcon as ArrowTrendingDownIconBig,
  ArrowTrendingUpIcon as ArrowTrendingUpIconBig,
  FlagIcon as FlagIconBig,
  TrophyIcon as TrophyIconBig,
  PauseCircleIcon as PauseCircleIconBig,
  PlayCircleIcon as PlayCircleIconBig,
} from '@heroicons/vue/24/outline'
import { type Duration, format } from 'date-fns'
import { de } from 'date-fns/locale'
import { computed } from 'vue'
import DayProgressBar from './DayProgressBar.vue'
import UiInlineStack from './UiInlineStack.vue'

const props = defineProps<{
  worktime: Duration
  breaktime: Duration
  remaining?: Duration
  targetTime?: Date
  isToday?: boolean
  workTimeIsLessThan8Hours?: boolean
  size: 'small' | 'big'
}>()

const hasOvertime = computed((): boolean => {
  if (props.remaining === undefined) {
    return false
  }
  console.log(props.remaining)
  return getDurationSign(props.remaining) === -1
})
</script>

<template>
  <div class="grid gap-2">
    <DayProgressBar :value="props.worktime"></DayProgressBar>

    <div class="flex gap-4" :class="{ 'text-xs': size === 'small', 'text-sm': size === 'big' }">
      <UiInlineStack>
        <template v-if="size === 'small'">
          <PlayCircleIconSmall class="w-4 h-4 text-sky-600"></PlayCircleIconSmall>
        </template>
        <template v-if="size === 'big'">
          <PlayCircleIconBig class="w-6 h-6 text-sky-600"></PlayCircleIconBig>
        </template>

        <span class="font-mono">{{ formatDuration(worktime) }}</span>
      </UiInlineStack>

      <template v-if="remaining !== undefined">
        <UiInlineStack>
          <template v-if="isToday">
            <template v-if="hasOvertime">
              <TrophyIconSmall
                v-if="size === 'small'"
                class="w-4 h-4 text-yellow-500"
              ></TrophyIconSmall>
              <TrophyIconBig v-if="size === 'big'" class="w-6 h-6 text-yellow-500"></TrophyIconBig>
            </template>
            <template v-else>
              <FlagIconSmall
                v-if="size === 'small'"
                class="w-4 h-4 text-emerald-600"
              ></FlagIconSmall>
              <FlagIconBig v-if="size === 'big'" class="w-6 h-6 text-emerald-600"></FlagIconBig>
            </template>
          </template>
          <template v-else>
            <template v-if="hasOvertime">
              <ArrowTrendingUpIconSmall
                v-if="size === 'small'"
                class="w-4 h-4 text-sky-600"
              ></ArrowTrendingUpIconSmall>
              <ArrowTrendingUpIconBig
                v-if="size === 'big'"
                class="w-6 h-6 text-sky-600"
              ></ArrowTrendingUpIconBig>
            </template>
            <template v-else>
              <ArrowTrendingDownIconSmall
                v-if="size === 'small'"
                class="w-4 h-4 text-orange-600"
              ></ArrowTrendingDownIconSmall>
              <ArrowTrendingDownIconBig
                v-if="size === 'big'"
                class="w-6 h-6 text-orange-600"
              ></ArrowTrendingDownIconBig>
            </template>
          </template>

          <span class="font-mono">{{ formatDuration(absDuration(remaining)) }}</span>

          <template v-if="targetTime !== undefined">
            <span>um </span>
            <span class="font-mono font-bold">{{
              format(targetTime, 'HH:mm', { locale: de })
            }}</span>
          </template>
        </UiInlineStack>
      </template>

      <UiInlineStack class="ml-auto">
        <PauseCircleIconSmall
          v-if="size === 'small'"
          class="w-4 h-4 text-yellow-600"
        ></PauseCircleIconSmall>
        <PauseCircleIconBig
          v-if="size === 'big'"
          class="w-6 h-6 text-yellow-600"
        ></PauseCircleIconBig>

        <span class="font-mono">{{ formatDuration(breaktime) }}</span>
      </UiInlineStack>
    </div>
  </div>
</template>
