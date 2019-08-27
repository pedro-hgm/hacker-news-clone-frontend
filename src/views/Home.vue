<template>
  <div>
    <!-- Search -->
    <v-card flat>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-text-field
          placeholder="Search stories"
          outlined
          solo
          single-line
          flat
          append-icon="mdi-magnify"
          color="grey"
        ></v-text-field>
      </v-card-actions>
    </v-card>
    <!-- Search End -->
    <v-container>
      <div class="page-title display-1 font-weigth-bold my-5">Top 15 Hacker News</div>
      <Story v-for="story in topStories" :key="story.id" :story="story" />
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Story from "../components/stories/Story";

export default {
  name: "Home",
  components: {
    Story
  },
  data() {
    return {
      topStoriesIds: [],
      topStories: this.$store.state.topStories,
      comments: [],
      hideComments: true
    };
  },
  created() {
    if (this.$store.state.topStories.length === 0)
      this.$store.dispatch("fetchTopStories");
  }
};
</script>

<style scoped>
.page-title {
  color: #ef6c00;
}
</style>