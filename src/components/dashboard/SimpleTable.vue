<template>
  <v-card flat>
    <v-skeleton-loader
      v-if="loading"
      type="list-item@12"
      class="pa-2"
    ></v-skeleton-loader>
    <template v-else>
      <v-card-title>Simple Table</v-card-title>
      <v-card-text>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in simpleTableData" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import { simpleTableData } from "@/assets/dashboard";

simpleTableData;
export default {
  data() {
    return {
      simpleTableData,
      loading: false,
    };
  },
};
</script>

<style scoped></style>
