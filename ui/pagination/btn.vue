<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<script>

</script>

<style scoped lang="sass">
.btn
  background-color: #fff
  color: #639bef
  padding: .5em
  border-radius: 3px
  cursor: pointer
  &:hover
    background-color: #639bef
    color: #fff

</style>