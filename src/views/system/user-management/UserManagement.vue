<template>
  <v-container fluid fill-height class="flex-column" :class="['d-flex']">
    <v-card flat width="100%" class="py-2 mb-2 px-4 d-flex align-center">
      <v-btn
        class="mr-1 mr-md-2"
        color="primary"
        small
        @click="createDialog = true"
      >
        New
      </v-btn>
      <v-btn
        :disabled="!selectedItems.length > 0"
        color="error"
        small
        @click="deleteManyDialog = true"
      >
        Delete
        <span v-if="selectedItems.length > 0">
          ({{ selectedItems.length }})
        </span>
      </v-btn>
      <v-spacer />
      <div class="ml-4 ma-md-0" style="width: 240px">
        <v-text-field
          dense
          single-line
          hide-details
          placeholder="Filter by keyword"
          clearable
          append-icon="mdi-magnify"
        />
      </div>
    </v-card>
    <v-data-table
      class="align-self-stretch flex-grow-1 border-radius-table"
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      item-key="name"
      show-select
      fixed-header
      checkbox-color="primary"
      :height="tableHeight"
    >
      <template #[`item.actions`]>
        <v-btn icon small rounded color="primary" @click="editDialog = true">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small rounded color="error" @click="deleteDialog = true">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <create-dialog v-model="createDialog" @reload="getUsers()" />
    <edit-dialog v-model="editDialog" @reload="getUsers()" />
    <delete-dialog v-model="deleteDialog" @reload="getUsers()" />
    <delete-many-dialog
      v-model="deleteManyDialog"
      :items="items"
      @reload="getUsers()"
    />
  </v-container>
</template>

<script>
import CreateDialog from "./CreateDialog.vue";
import DeleteDialog from "./DeleteDialog.vue";
import EditDialog from "./EditDialog.vue";
import DeleteManyDialog from "./DeleteManyDialog.vue";
export default {
  data: () => ({
    selectedItems: [],
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
      { text: "Actions", value: "actions", align: "center", sortable: false },
    ],
    items: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
        iron: 1,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9,
        carbs: 37,
        protein: 4.3,
        iron: 1,
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16,
        carbs: 23,
        protein: 6,
        iron: 7,
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: 8,
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16,
        carbs: 49,
        protein: 3.9,
        iron: 16,
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0,
        carbs: 94,
        protein: 0,
        iron: 0,
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: 2,
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: 45,
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25,
        carbs: 51,
        protein: 4.9,
        iron: 22,
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26,
        carbs: 65,
        protein: 7,
        iron: 6,
      },
    ],
    // dialogs
    createDialog: false,
    editDialog: false,
    deleteDialog: false,
    deleteManyDialog: false,
  }),
  computed: {
    tableHeight() {
      return window.screen.height - 350;
    },
  },
  components: { DeleteDialog, DeleteManyDialog, CreateDialog, EditDialog },
  methods: {
    getUsers() {
      this.$notify.dismiss();
    },
  },
};
</script>

<style scoped></style>
