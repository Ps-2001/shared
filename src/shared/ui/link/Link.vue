<template>
  <div @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { redirect } from "@/shared/lib/useURL.js"

const props = defineProps({
  href: String,
  status: String,
  callback: Function,
});

const handleClick = (event) => {
  if (!props.href) event.preventDefault()
  else redirect({ url: props.href })
}

const handleMouseEnter = () => {
  window.status = props.href || props.status
}

const handleMouseLeave = () => {
  window.status = ''
}
</script>
