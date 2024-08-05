<template>
  <div class="label">
    <ul class="list">
      <Btn class="list-page"
           v-for="(page, n) in PageMax"
           @click="selectPage({ page: n + 1 })"
      >{{ n + 1 }}</Btn>
    </ul>
  </div>
</template>

<script setup>
import Btn from './btn.vue'
import {ref} from "vue";

defineProps(['PageMax'])
const emit = defineEmits(['select'])

const page = ref(1)

const selectPage = (payload) => {
  page.value = payload.page
  emit('select', payload)
}
</script>

<style scoped lang="sass">
.list
  display: flex
  justify-content: center
  &-page
    margin: .2em

</style>