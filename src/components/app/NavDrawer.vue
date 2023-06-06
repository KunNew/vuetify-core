<template>
  <v-navigation-drawer
    :mini-variant="mini"
    app
    :clipped="clipped"
    v-model="$store.state.app.navDrawer"
    :dark="!clipped"
    :color="!clipped ? ($vuetify.theme.dark ? '#1e1e1e' : '#17263d') : 'auto'"
    :floating="!$vuetify.theme.dark && clipped"
  >
    <template #prepend v-if="!clipped">
      <v-list-item dense class="d-flex align-center py-1">
        <v-list-item-icon class="align-self-center">
          <v-img
            max-width="24"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
          ></v-img>
        </v-list-item-icon>
        <v-list-item-content class="text-h6 text-truncate py-0">
          Vuetify Core
        </v-list-item-content>
      </v-list-item>
      <v-divider />
    </template>
    <v-list nav dense expand>
      <v-list-item to="/dashboard" link color="blue">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title> Home </v-list-item-title>
      </v-list-item>
      <v-list-group no-action prepend-icon="mdi-cog">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>System</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item to="/user-management">
          <v-list-item-content>
            <v-list-item-title>User Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- only show up when lg and up -->
    <!-- <template #append class="d-none" v-if="$vuetify.breakpoint.lgAndUp">
      <v-divider />
      <v-btn block @click.stop="mini = !mini" text>
        <v-icon>{{
          mini ? "mdi-chevron-double-right" : "mdi-chevron-double-left"
        }}</v-icon>
      </v-btn>
    </template> -->
  </v-navigation-drawer>
</template>
<script>
import { routes } from "@/router";

export default {
  components: {
    TailedTooltip: () => import("@/components/TailedTooltip.vue"),
  },
  data: () => ({
    mini: false,
    secondMenu: {},
    tooltip: {},
    items: [
      {
        action: "mdi-ticket",
        items: [{ title: "List Item" }],
        title: "Attractions",
      },
      {
        action: "mdi-silverware-fork-knife",
        active: true,
        items: [
          { title: "Breakfast & brunch" },
          { title: "New American" },
          { title: "Sushi" },
        ],
        title: "Dining",
      },
      {
        action: "mdi-school",
        items: [{ title: "List Item" }],
        title: "Education",
      },
      {
        action: "mdi-human-male-female-child",
        items: [{ title: "List Item" }],
        title: "Family",
      },
      {
        action: "mdi-bottle-tonic-plus",
        items: [{ title: "List Item" }],
        title: "Health",
      },
      {
        action: "mdi-briefcase",
        items: [{ title: "List Item" }],
        title: "Office",
      },
      {
        action: "mdi-tag",
        items: [{ title: "List Item" }],
        title: "Promotions",
      },
    ],
  }),
  watch: {
    "$vuetify.breakpoint.mdAndDown"(val) {
      if (val) {
        this.mini = false;
      }
    },
  },
  computed: {
    clipped() {
      return this.$store.state.app.clipped;
    },
  },
  methods: {},
};
</script>
