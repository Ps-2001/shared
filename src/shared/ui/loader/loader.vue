<template>
  <teleport to="body">
    <div class="bg">
      <div class="loader center" />
    </div>
  </teleport>
</template>

<script setup>

</script>

<style scoped>
.bg {
  position: absolute;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loader {
  position: absolute;
  top: 25%;
  left: 50%;
  width: 5%;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #646464;
  --_m:
      conic-gradient(#0000 10%,#000),
      linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>