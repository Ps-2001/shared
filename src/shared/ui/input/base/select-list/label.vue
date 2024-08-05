<template>
  <div class="select-label" :class="classNames" >
    <span class="text">{{ text }}</span>
    <i class="arrow">
      <IconArrow width="1.5rem" color="#333"/>
    </i>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { IconArrow } from "@/shared/ui/icons/index.js";

const props = defineProps(['text', 'active'])

const classNames = computed(() => ({
  'active': !!props.active
}))


</script>

<style scoped lang="sass">
.select-label
  display: flex
  align-items: center
  justify-content: space-between
  padding: .5rem
  border: 1px solid #e6e6e7
  border-radius: .33rem
  .text
    font-size: 14px
  &:hover
    border: 1px solid #bcbcbe

.active
  //border: 1px solid rgba(81, 203, 281) !important
  border: 1px solid #188787 !important

</style>