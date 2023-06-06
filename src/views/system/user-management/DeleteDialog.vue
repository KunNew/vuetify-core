<template>
  <v-dialog :value="value" width="300px" persistent>
    <v-card>
      <v-card-title> Delete Confirm </v-card-title>
      <v-card-text class="my-4">
        <v-icon color="warning" small class="mr-1">mdi-alert-circle</v-icon>
        Sure to delete this user?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('input', false)"> Cancel </v-btn>
        <v-btn text color="primary" @click="submit()" :loading="submitting">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    submitting: false,
  }),
  methods: {
    submit() {
      this.submitting = true;

      this.submitting = false;
      this.$emit("input", false);

      this.$notify.success(`Deleted!`);

      setTimeout(() => {
        this.$notify.loading("Reload..");
        this.$emit("reload");
      }, 800);
    },
  },
};
</script>

<style scoped></style>
