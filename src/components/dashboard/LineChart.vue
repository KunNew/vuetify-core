<template>
  <v-card flat>
    <v-card-text style="height: 450px" ref="chartContainer">
      <v-skeleton-loader v-if="loading" type="image,image" max-height="400px" />
    </v-card-text>
  </v-card>
</template>
<script>
import * as echarts from "echarts";

import { lineChartData } from "@/assets/dashboard";

export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(this.drawChart, 500);
  },
  methods: {
    async drawChart() {
      const chartDom = this.$refs.chartContainer;
      if (chartDom) {
        const chartData = lineChartData;
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: "Line",
            left: "left",
          },
          xAxis: {
            type: "category",
            data: chartData.map((cd) => cd.name),
          },
          yAxis: {
            type: "value",
          },
          tooltip: {
            show: true,
          },
          series: [
            {
              data: chartData.map((cd) => cd.value),
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }
      this.loading = false;
    },
  },
};
</script>
