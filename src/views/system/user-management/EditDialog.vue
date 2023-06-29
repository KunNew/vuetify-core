<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card :loading="loading">
      <v-card-title> Edit User </v-card-title>
      <v-card-text>
        <v-alert
          text
          type="warning"
          icon="mdi-alert-circle"
          dismissible
          close-icon="mdi-close"
          v-model="warningAlert"
          >{{ indications.warning }}</v-alert
        >
        <v-alert
          text
          type="error"
          icon="mdi-alert"
          dismissible
          close-icon="mdi-close"
          v-model="errorAlert"
          >{{ indications.error }}</v-alert
        >

        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name*"
                required
                v-model="formData['name']"
                :rules="[(val) => !!val || 'Name cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="email"
                label="Email*"
                v-model="formData['email']"
                :rules="[(val) => !!val || 'Email cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                label="Password*"
                required
                v-model="formData['password']"
                :rules="[(val) => !!val || 'Password cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="Image *"
                v-model="formData['avatar']"
              ></v-file-input>
              <!-- <v-select
                label="Role"
                v-model="formData['roles']"
                :items="roles"
                multiple
                item-text="name"
                item-value="id"
              /> -->
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)" text> Cancel </v-btn>
        <v-btn color="primary" @click="submit" :loading="submitting" text>
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axiosApiInstance from "@/utils/utilites";

export default {
  props: ["value", "item"],
  data() {
    return {
      indications: {
        warning: "",
        error: "",
      },
      loading: false,
      warningAlert: false,
      errorAlert: false,
      formData: {},
      submitting: false,
    };
  },
  watch: {
    async value(val) {
      if (!val) {
        this.warningAlert = false;
        this.errorAlert = false;
        this.formData = {};
        this.$refs.form.resetValidation();
      } else {
        // this.formData = JSON.parse(JSON.stringify(this.item));
        this.loading = true;
        const res = await axiosApiInstance.get(`/users/${this.item._id}`);

        this.formData = res.data;
        this.loading = false;
      }
    },
  },
  computed: {
    modified() {
      return JSON.stringify(this.formData) !== JSON.stringify(this.item);
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.modified) {
          this.submitting = true;
          delete this.formData["_id"];
          await axiosApiInstance.put(`/users/${this.item._id}`, this.formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.submitting = false;

          this.$notify.success("Update saved!");
          setTimeout(() => {
            this.$notify.loading("Reloading..");
            this.$emit("reload");
          }, 800);
        }
      }
      this.$emit("input", false);
    },
  },
};
</script>
