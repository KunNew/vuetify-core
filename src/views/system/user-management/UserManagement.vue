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
          v-model="searchQuery"
          placeholder="Filter by keyword"
          clearable
          append-icon="mdi-magnify"
        />
      </div>
    </v-card>
    <v-data-table
      class="align-self-stretch flex-grow-1 border-radius-table"
      v-model="selectedItems"
      :headers="dataTable.headers"
      :items="dataTable.items"
      item-key="name"
      show-select
      fixed-header
      :loading="loading"
      checkbox-color="primary"
      :height="tableHeight"
      :options.sync="options"
      :server-items-length="dataTable.meta.total"
    >
      <!-- plan -->
      <template #[`item.no`]="{ item, index }" :ref="item.id">
        {{ options.itemsPerPage * (options.page - 1) + index + 1 }}
      </template>
      <template #[`item.avatar`]="{ item }">
        <v-avatar>
          <v-img :src="constant.baseUrl + '/' + item.avatar" />
        </v-avatar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          icon
          small
          rounded
          color="primary"
          @click="
            selectedItem = item;
            editDialog = true;
          "
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          small
          rounded
          color="error"
          @click="
            selectedItem = item;
            deleteDialog = true;
          "
        >
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <create-dialog v-model="createDialog" />
    <edit-dialog
      v-model="editDialog"
      :item="selectedItem"
      @reload="getUsers()"
    />
    <delete-dialog
      v-model="deleteDialog"
      :item="selectedItem"
      @reload="getUsers()"
    />
    <delete-many-dialog
      v-model="deleteManyDialog"
      :items="dataTable.items"
      @reload="getUsers()"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import CreateDialog from "./CreateDialog.vue";
import DeleteDialog from "./DeleteDialog.vue";
import EditDialog from "./EditDialog.vue";
import DeleteManyDialog from "./DeleteManyDialog.vue";
import constants from "@/constants";
import axiosApiInstance from "@/utils/utilites";
import _ from "lodash";
export default {
  data: () => ({
    constant: constants,
    selectedItems: [],
    selectedItem: null,
    search: null,
    loading: false,
    dataTable: {
      headers: [
        {
          text: "No",
          align: "start",
          sortable: false,
          value: "no",
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Avatar", value: "avatar" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      items: [],
      totalItems: 0,
      meta: {
        total: 0,
      },
    },
    options: {
      sortBy: ["id"],
      sortDesc: [true],
      itemsPerPage: 10,
      page: 1,
    },
    searchQuery: null,
    // dialogs
    createDialog: false,
    editDialog: false,
    deleteDialog: false,
    deleteManyDialog: false,
    isConnected: false,
  }),
  computed: {
    tableHeight() {
      return window.screen.height - 350;
    },
  },
  components: { DeleteDialog, DeleteManyDialog, CreateDialog, EditDialog },
  watch: {
    searchQuery: _.debounce(function (val) {
      this.getUsers();
    }, 1000),
    options: {
      handler(val) {
        if (val) {
          // console.log(val);
          this.getUsers();
        }
      },
      deep: true,
    },
  },
  sockets: {
    connect() {
      console.log("Connected to server");
    },
    disconnect() {
      console.log("Disconnected from server");
    },
    "my broadcast"(msg) {
      this.dataTable["items"].push(msg);
      this.getUsers();
    },
    "delete-user"(user) {
      const index = this.dataTable["items"].findIndex(
        (it) => it._id === user._id
      );
      this.dataTable["items"].splice(index, 1);
    },
  },
  methods: {
    async getUsers() {
      this.loading = true;
      const res = await axiosApiInstance.get(`/users`, {
        params: {
          page: this.options.page,
          rowsPerPage:
            this.options.itemsPerPage === -1
              ? this.dataTable.meta.total
              : this.options.itemsPerPage,
          search: this.searchQuery,
        },
      });

      this.dataTable["items"] = res.data.users;
      this.dataTable["meta"]["total"] = res.data.totalUsers;

      this.loading = false;

      this.$notify.dismiss();
    },
  },

  mounted() {},
  beforeUnmount() {},
};
</script>

<style scoped></style>
