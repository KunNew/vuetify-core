<template>
  <v-card flat>
    <v-row class="px-5">
      <v-col cols="8">
        <v-card-title class="text-subtitle-2 text-uppercase pa-0"
          >{{ item.title }}
        </v-card-title>
        <div>
          <span class="text-h5 mr-1">0</span>
          <span class="grey--text"
            >/ 10<small class="ml-1" v-show="true">Can</small>
          </span>
        </div>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-end">
        <v-avatar :color="item.color" rounded size="64px">
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-avatar>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import cards from "@/assets/data/overview-card";
export default {
  name: "OverviewCard",
  data() {
    return {
      cards,
    };
  },
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
