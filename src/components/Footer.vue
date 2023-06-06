<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text class="white--dark"
        >{{ new Date().getFullYear() }} —<strong>Kun new</strong></v-card-text
      >
    </v-card>
  </v-footer>
</template>

<script>
export default {
  computed: {
    clipped() {
      return this.$store.state.app.clipped;
    },
  },
};
</script>

<style scoped></style>
