<template>
  <div id="app" class="app-shell">
    <app-header v-show="!hideHeaderList.includes($route.name)" />
    <main class="route-shell">
      <router-view />
    </main>
  </div>
</template>

<script>
import appHeader from "@/components/Header.vue";

export default {
  components: {
    appHeader,
  },
  data() {
    return {
      hideHeaderList: [],
    };
  },
};
</script>

<style>
@import url("./reset.css");
@import url("./styles/theme.css");
</style>

<style lang="less">
#app {
  min-height: 100vh;
}

.route-shell {
  padding-top: 64px;
}

@media (max-width: 920px) {
  .route-shell {
    padding-top: 60px;
  }
}
</style>
