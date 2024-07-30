<template>
<div class="card">
  <slot></slot>
</div>
</template>

<style scoped lang="sass">
  .card
    box-shadow: 0px 8px 8px 0px rgba(34, 60, 80, 0.23)
    transition: all 200ms linear
    border-radius: 13px
    &:hover
      box-shadow: 0px 8px 30px -6px rgba(34, 60, 80, 0.27)
</style>