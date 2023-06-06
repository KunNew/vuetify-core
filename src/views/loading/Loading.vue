<template>
  <v-container
    fill-height
    class="ma-0 pa-0"
    fluid
    style="background-color: #233a5f"
  >
    <v-overlay opacity="0">
      <v-alert color="info" text class="box-shadow">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-alert>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: "Loading",
  /**
   * Redirect
   */
  mounted() {
    setTimeout(async () => {
      // const token = getAccessToken();
      const token = true;
      let destination = "/sign-in";
      // if (token) {
      //   if (this.$store.getters.accessibleRoutes.length > 0) {
      //     destination = this.$store.getters.accessibleRoutes[0];
      //   } else {
      //     this.$notify.warning(
      //       "None accessible menus found! contact administrator to get authorized.."
      //     );
      //     await this.$store.dispatch("auth/signOut");
      //     await this.$router.push("/sign-in");
      //   }
      // }
      if (token) {
        destination = "/dashboard";
      } else {
        // this.$notify.warning(
        //   "None accessible menus found! contact administrator to get authorized.."
        // );
        await this.$router.push("/sign-in");
      }

      await this.$router.replace(destination);
    }, 800);
  },
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0 0 10px #29b6f6, 0 0 37px #29b6f6, 0 0 61.8px #29b6f6,
    0 0 198px #29b6f6 !important;
}
</style>
