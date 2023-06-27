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
      const authenticated = this.$store.state.auth.authenticated;
      // const token = this.$store.state.auth.accessToken;

      let destination = "/login";

      if (authenticated) {
        destination = "/dashboard";
        await this.$router.push(destination);
      } else {
        await this.$store.dispatch("auth/logout");
        await this.$router.push("/login");
      }

      // await this.$router.replace(destination);
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
