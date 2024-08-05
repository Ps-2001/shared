<template>
  <div class="label">
    <span class="prew">{{ getText }}</span>

    <span class="detail">
      <span class="space"></span>
      <span class="text">{{ text }}</span>
    </span>

  </div>
</template>

<script setup>
import { reduction } from '../lib/main/useString.js'
import { Modal } from './modal'
import {computed, ref} from "vue";

const props = defineProps(['className', 'text', 'length'])

const isRead = ref(false)

const getText = computed(() => reduction({ text: props.text, length: props.length }))
</script>

<style scoped lang="sass">
.label
  position: relative
  &:hover .detail
    display: block
  .prew
    &:after
      content: ""
      position: absolute
      top: 0
      right: 0
      width: 100%
      height: 100%
      //background: linear-gradient(to left, rgb(232, 232, 232) 60%, #f3f3f3 30%)
      opacity: .4
      cursor: pointer

  .detail
    position: absolute
    min-width: 10vw
    max-width: 40vw
    left: 25%
    right: 0
    display: none
    background-color: #fff
    z-index: 50
    .text
      display: block
      padding: 8px
      border: 1px #333 solid
    .space
      display: block
      height: .6em
</style>
