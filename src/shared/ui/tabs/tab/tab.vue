<template>

  <div :class="['tab', { active: tab.isActive, invalid: !valid, disabled: tab?.disabled }]">
    <span :class="['tab-name', {  }]">{{ tab.name }}</span>
    <IconClose v-if="isPossibleClose" class="close" @click.stop="removeTab(tab)" width="10" height="10" :border="tab.isActive ? '#188787' : 'white'" />
  </div>

  <Modal
      v-if="isShowModal"
      :sub-title="`Вы уверены, \n что хотите удалить ${tab?.elemName || ''}?`"
      @close="isShowModal = false"
  >
    <div class="wrapper">
      <Button class="btn-dell" @click="removeTab(tab, false)" >Удалить</Button>
    </div>
  </Modal>

</template>

<script setup>
import { IconClose } from "@/shared/ui/icons"
import { Button } from "@/shared/ui/button"
import { Modal } from "@/shared/ui/modal"
import { ref, computed, toRefs } from "vue"


const props = defineProps(['index', 'tab', 'edit', 'valid'])
const emit = defineEmits(['delete'])

const { index, tab, edit } = toRefs(props)

const isShowModal = ref(false)

// let isPossibleClose = computed(() => edit.value && tab.value?.edit && !tab.value?.disabled && index.value > 0)
let isPossibleClose = computed(() => edit.value && tab.value?.edit && !tab.value?.disabled && index.value > 0)

const removeTab = (tab, secure) => {

  let isSafeRemove

  if (tab?.secure !== undefined && secure === undefined) isSafeRemove = tab?.secure
  if (secure !== undefined) isSafeRemove = secure

  if (isSafeRemove) return isShowModal.value = true

  isShowModal.value = false
  emit('delete', { tab })

}
</script>

<style scoped lang="sass">
.btn-dell
  margin-top: 32px
.close
  margin-left: 5px
  padding: 3px
  cursor: pointer

.tab
  padding: 15px 20px 10px
  margin-right: 3px
  border-radius: 8px 8px 0 0
  cursor: pointer
  background-color: #BAC5C5
  color: white
  &.active
    background-color: white
    font-weight: bold
    color: #333
    cursor: default
    &.invalid
      border: 1px #E12928 solid
  &.invalid
    //color: #E12928
  &-name

      //animation: blink 5s infinite

@keyframes blink
  0%, 100%
    color: initial
  50%
    color: red

@import "custom"


</style>