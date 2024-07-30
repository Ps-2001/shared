<template>
  <div class="navigate">
    <div class="navigate-prew" @click="change({ method: '<' })">
      <IconArrow class="icon rotate-left" width="1.4rem" color="#333"/>
    </div>

    <div class="navigate-name">{{ navigateText }}</div>

    <div class="navigate-next" @click="change({ method: '>' })">
      <IconArrow class="icon rotate-right" width="1.4rem" color="#333"/>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import { IconArrow } from "@/shared/ui/icons/index.js";

const props = defineProps(['navigate', 'navigateText'])
const emit = defineEmits(['change'])

const getYear = computed(() => +props.navigate.year.number)
const getMonth = computed(() => +props.navigate.month.number)

const change = payload => {
  let { method } = payload
  let year, month

  if (method === '<') {

    if (getMonth.value === 1) {
      year = getYear.value - 1
      month = 12
    }

    else {
      year = getYear.value
      month = getMonth.value - 1
    }


  }

  if (method === '>') {

    if (getMonth.value === 12) {
      year = getYear.value + 1
      month = 1
    }

    else {
      year = getYear.value
      month = getMonth.value + 1
    }

  }

  emit('change', { year, month })
}

onMounted(() => {

})

</script>

<style scoped lang="sass">
.navigate
  display: flex
  align-items: center
  justify-content: space-between
  padding: .8rem .7rem
  &-prew, &-next
    cursor: pointer

</style>