<template>
  <v-container fluid fill-height>
    <v-row v-if="loading">
      <v-col
        cols="12"
        class="mb-2 mb-md-0"
        sm="6"
        md="3"
        v-for="i in 4"
        :key="i"
      >
        <v-skeleton-loader type="list-item-three-line" />
      </v-col>
    </v-row>
    <v-row class="py-4" v-else>
      <v-col
        class="mb-2 mb-md-0"
        cols="12"
        sm="6"
        md="3"
        v-for="(item, index) in cards"
        :key="index"
      >
        <overview-card :item="item" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <LineChart />
          </v-col>
          <v-col cols="6">
            <LineChart />
          </v-col>
          <v-col cols="6">
            <LineChart />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="d-flex">
        <SimpleTable class="align-self-stretch" style="width: 100%" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OverviewCard from "../components/dashboard/OverviewCard.vue";
import cards from "@/assets/data/overview-card";
import LineChart from "../components/dashboard/LineChart.vue";
import SimpleTable from "@/components/dashboard/SimpleTable.vue";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      cards,
    };
  },

  components: {
    OverviewCard,
    LineChart,
    SimpleTable,
  },
};
</script>
