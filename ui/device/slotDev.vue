<template>
  <slot v-if="isDev()">

  </slot>
</template>

<script setup>
import {ref} from 'vue'
import { isDev } from "@/shared/lib/useDevice.js"

const props = defineProps([])

</script>

<style scoped lang="sass">

</style>