<template>
  <v-app>
    <!-- notification -->
    <notification />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Notification from "./components/app/Notification.vue";
export default {
  name: "App",
  components: {
    Notification,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "styles/main.scss";
html {
  overflow-y: auto !important;
}
</style>
