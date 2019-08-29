<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-text-field
          placeholder="Search stories"
          outlined
          solo
          single-line
          flat
          append-icon="mdi-magnify"
          color="#ff6600"
          class="mx-12 mt-4 mb-n3"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TheSearch"
};
</script>

<style scoped>
</style>