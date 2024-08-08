<template>

  <router-link v-if="to" :to="to">
    <slot></slot>
  </router-link>

  <div v-else-if="href" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <slot></slot>
  </div>

</template>

<script setup>
import { defineProps } from 'vue'
import {  } from 'vue-router'
import { redirect } from "@/shared/lib/main/useURL.js"

const props = defineProps({
  href: String,
  to: String,
  status: String,
  callback: Function,
})

const handleClick = (event) => {
  if (!props.href) event.preventDefault()
  else redirect(props.href)
}

const handleMouseEnter = () => {
  window.status = props.href || props.status
}

const handleMouseLeave = () => {
  window.status = ''
}
</script>
