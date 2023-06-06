<template>
  <v-app-bar
    app
    flat
    dense
    :dark="clipped"
    :clipped-left="clipped"
    :class="{ blurred: !clipped && !$vuetify.theme.dark }"
    :color="clipped ? ($vuetify.theme.dark ? '#1e1e1e' : '#17263d') : 'auto'"
  >
    <v-app-bar-nav-icon class="d-lg-nonet" @click="showNavDrawer()">
    </v-app-bar-nav-icon>

    <template v-if="clipped">
      <v-img
        max-width="24"
        class="mr-3"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
      ></v-img>
      <div class="title white--text d-none d-md-block">Vuetify Core</div>
    </template>
    <v-spacer />
    <v-btn
      small
      icon
      class="mr-1"
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
    >
      <v-icon small>
        {{
          $vuetify.theme.dark
            ? "mdi-white-balance-sunny"
            : "mdi-moon-waxing-crescent"
        }}
      </v-icon>
    </v-btn>
    <v-btn
      small
      icon
      class="mr-1"
      @click="$store.commit('app/SET_CLIPPED', !clipped)"
    >
      <v-icon small>
        {{
          !clipped ? "$vuetify.icons.layout-clipped" : "$vuetify.icons.layout"
        }}
      </v-icon>
    </v-btn>
    <!-- avatar  -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon light small v-bind="attrs" v-on="on">
          <v-avatar size="24px" color="rgb(207, 224, 214)">
            <v-icon small> mdi-account </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list
        class="pa-0 text-center"
        dense
        max-width="100"
        :class="{ blurred: !clipped && !$vuetify.theme.dark }"
      >
        <v-list-item class="text-caption py-0">
          <v-list-item-title class="text-truncate">Kun New</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item class="red--text">
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- loading -->
    <v-progress-linear
      :value="loading.progress"
      v-if="loading.isLoading"
      absolute
      top
      color="info"
      height="3"
    />
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.state.app.loading;
    },
    clipped() {
      return this.$store.state.app.clipped;
    },
  },
  methods: {
    showNavDrawer() {
      this.$store.commit(
        "app/SET_NAV_DRAWER",
        !this.$store.state.app.navDrawer
      );
    },
  },
};
</script>

<style scoped>
.blurred {
  background: rgba(255, 255, 255, 0.618) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
}
</style>
