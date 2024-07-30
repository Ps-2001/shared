<template>
  <teleport to="body">
    <div
      class="bg"
      @click="emit('close')"
      :class="classNames"
    >
      <div
        @click.stop
        class="toast"
        :class="classNames"
        :style="{ width }"
      >
        <h1 class="title" >{{ title }}</h1>
        <slot />
      </div>
      <Button
        class="hide"
        @click="emit('close')"
      >x</Button>
    </div>
  </teleport>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {toogle} from "@/widgets/side-bar/lib/saveClient.js";

const props = defineProps({
  title: String,
  width: {
    default: 30
  },
  position: {
    default: 'left'
  },
  open: {
    default: false
  }
})
const emit = defineEmits(['close'])


const width = computed(() => +props.width > 100 ? '30vw' : props.width + 'vw')
const classNames = computed(() => ({
  show: props.open,
  left: props.position === 'left',
  right: props.position === 'right',
}))

</script>

<style scoped lang="sass">
.bg
  display: none
.toast
  position: fixed
  background-color: white
  display: none
  height: 100vh
  top: 0
  right: 0
  border: 1px green solid
  padding: 2rem 2rem
  z-index: 1000
  .title
    margin-bottom: 1.4rem
.hide
  position: absolute

.show
  display: block

</style>