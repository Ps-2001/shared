<template>
  <div class="count">
    <span class="count-text">{{ `${length} / ${max}` }}</span>
  </div>
</template>

<script setup>
import {watchEffect} from "vue";
import {reduction} from "@/shared/lib/main/useString.js";

const props = defineProps(['value', 'length', 'max'])
const emit = defineEmits(['stop'])

watchEffect(() => {
  if (+props.length > +props.max) {
    emit('stop', { value: reduction({ text: props.value, length: props.max, separator: '' }) })
  }
})

</script>

<style scoped lang="sass">
.count
  &-text
    display: block
    white-space: nowrap
    width: 100%

</style>
