<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card :loading="loading">
      <v-card-title> New User </v-card-title>
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
                label="Name *"
                required
                v-model="formData['name']"
                :rules="[(val) => !!val || 'Name cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="email"
                label="Email *"
                required
                v-model="formData['email']"
                :rules="[(val) => !!val || 'Email cannot be empty!']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                label="Password *"
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
        <v-spacer />
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
import axios from "axios";
export default {
  props: ["value"],
  data() {
    return {
      indications: {
        warning: "",
        error: "",
      },
      warningAlert: false,
      errorAlert: false,
      formData: {},
      loading: false,
      submitting: false,
      roles: [],
    };
  },
  watch: {
    async value(val) {
      if (!val) {
        this.formData = {};
        this.$refs.form.resetValidation();
        this.errorAlert = false;
        this.warningAlert = false;
      } else {
        this.loading = true;

        this.loading = false;
      }
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.submitting = true;
        // console.log(this.formData);
        let formData = new FormData();
        formData.append("name", this.formData["name"]);
        formData.append("email", this.formData["email"]);
        formData.append("password", this.formData["password"]);
        formData.append("avatar", this.formData["avatar"]);
        await axiosApiInstance.post(`/users`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.$notify.success("Created!");
        this.$socket.emit("my message", this.formData);
        setTimeout(() => {
          this.$notify.loading("Reloading..");
          this.$emit("reload");
        }, 800);

        this.submitting = false;
        this.$emit("input", false);
      }
    },
  },
};
</script>
