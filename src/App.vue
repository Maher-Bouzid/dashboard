<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
.alertTop {
  display: flex !important;
  position: fixed !important;
  top: 56px !important;
  left: 50% !important;
  z-index: 20 !important;
  transform: translate(-50%, 50%) !important;
  animation: 0.2s ease-out 0s 1 slideInTop;
}

.alertTop button {
  margin-left: 40px !important;
}

@keyframes slideInTop {
  0% {
    opacity: 0;
    transform: translate(-50%, 100%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 50%);
  }
}

@keyframes slideInBottom {
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.alert .md-icon {
  color: white;
}
</style>
