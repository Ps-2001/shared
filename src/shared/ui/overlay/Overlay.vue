<template>
  <teleport to="body">
    <div class="overlay"  @click="isClose && emit('close')">
      <slot>

      </slot>
    </div>
  </teleport>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  isClose: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['close'])

</script>

<style scoped lang="sass">
@import "style"
</style>
