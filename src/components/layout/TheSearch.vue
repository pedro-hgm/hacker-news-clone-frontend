<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-text-field
          @keypress.enter="queryStories"
          v-model="query"
          :placeholder="placeholder"
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
  name: "TheSearch",
  data() {
    return {
      query: "",
      placeholder: "Search stories"
    };
  },
  methods: {
    queryStories() {
      const query = this.query;
      if (!this.validateQuery(query)) return;
      this.fetchStoriesByQuery(query);
      this.query = "";
    },
    validateQuery(query) {
      if (!query.length) {
        this.feedback("Can't be blank");
        return false;
      }
      return true;
    },
    feedback(message) {
      this.placeholder = message;
      setTimeout(() => {
        this.placeholder = "Search stories";
      }, 2000);
    },
    async fetchStoriesByQuery(query) {
      try {
        const response = await this.$store.dispatch(
          "fetchStoriesByQuery",
          query
        );
        response
          ? this.$emit("query")
          : this.feedback("Couldn't find any results for your search");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
</style>