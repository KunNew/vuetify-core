<template>
  <v-app>
    <Appbar />
    <NavDrawer />
    <main
      :style="{
        'background-color': $vuetify.theme.dark ? '#363636' : '#f2f3f8',
      }"
    >
      <router-view />
    </main>
    <Footer />
  </v-app>
</template>

<script>
import NavDrawer from "../components/app/NavDrawer.vue";
import Appbar from "../components/app/Appbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "MainLayout",
  components: {
    Appbar,
    NavDrawer,
    Footer,
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped></style>
