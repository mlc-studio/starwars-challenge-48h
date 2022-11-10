
<template>
  <ReloadPWA />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReloadPWA from "./components/ReloadPWA.vue";
export default defineComponent({
  name: "App",
  components: {
    ReloadPWA,
  },
});
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>
