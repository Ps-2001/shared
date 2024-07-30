<template>
<div class="card">
  <slot></slot>
</div>
</template>

<style scoped lang="sass">
  .card
    //box-shadow: -1px 3px 14px -4px rgba(53, 84, 108, 0.33)
    border-radius: 3px
    background-color: #ffffff
    box-shadow: 0px 3px 7px 1px rgba(53, 84, 108, 0.33)
    &:hover
      box-shadow: 0px 3px 7px 3px rgba(53, 84, 108, 0.33)

</style>