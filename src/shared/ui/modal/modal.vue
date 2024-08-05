<template>
  <teleport to="body">
    <div class="bg" @click="close">
      <div class="modal modal-ps" @click.stop>

        <div class="modal-header">
          <IconClose v-if="!noClose" width="16" class="modal-header-close" @click="close" border="#404040" />
          <h1 v-if="title" class="title">{{ title }}</h1>
          <h3 v-if="subTitle" class="sub-title">{{ subTitle }}</h3>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer">
          <div class="controlls">
            <slot name="footer"></slot>
          </div>
        </div>

      </div>
    </div>
  </teleport>
</template>

<script setup>
import { IconClose } from "@/shared/ui/icons";
import { inject, markRaw, onMounted, onUnmounted, ref, computed, watchEffect } from "vue";
import { isMobileDevice, toggleFullScreen } from "@/shared/lib/useDevice.js";

const props = defineProps(['title', 'subTitle', 'noClose', 'autoClose'])
const emit = defineEmits(['close'])


const close = () => {

  if (props.noClose) return

  emit('close')

}

onMounted(() => {
  const isMobile = isMobileDevice()

  isMobile ? toggleFullScreen({ state: true }) : toggleFullScreen({ state: false })
})

onUnmounted(() => toggleFullScreen({ state: false }))

</script>

<style scoped lang="sass">
.bg
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  background-color: rgba(0, 0, 0, .3)
  top: 0
  bottom: 0
  left: 0
  right: 0
  width: 100%
  height: 100%
  z-index: 1000

.modal, .modal-ps
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  max-width: 48%
  max-height: 70vh
  height: auto
  background-color: #ffffff
  padding: 1rem
  transition: height ease-in-out .3s
  color: #404040

  &-header
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    border-bottom: none
    &-close
      cursor: pointer
      padding: 20px
    .title, .sub-title
      max-width: 100%
      text-align: center
      word-wrap: break-word
      white-space: pre-wrap
    .title
      display: block
      font-weight: bold
      line-height: 49px
      margin-bottom: 22px
    .sub-title
      font-size: 16px


  &-body
    display: flex
    flex-direction: column
    //justify-content: center
    align-items: center
    overflow-y: auto
    height: auto
    max-height: 70vh
    flex: initial


  &-footer
    border-top: none
    .controlls
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
      text-align: center
      //padding: 20px 0 10px

@import "custom"

</style>
