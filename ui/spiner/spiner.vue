<template>
  <teleport to="body">
    <div class="bg">
      <div class="loader"></div>
    </div>
  </teleport>
</template>

<script setup>

</script>

<style scoped >
.bg {
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .2);
  z-index: 100
}
.loader {
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  border: 3px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: r360 1s infinite linear;
}
.loader:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-bottom-color: #ff3d00;
}
@keyframes r360 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>