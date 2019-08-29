<template>
  <div>
    <TheSearch @query="getSearchedStories" />
    <v-container>
      <div class="mx-12">
        <div class="page-title headline font-weight-bold my-5">{{ title }}</div>
        <Story v-for="story in stories" :key="story.id" :story="story" />
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Story from "../components/stories/Story";
import TheSearch from "../components/layout/TheSearch";
import { watch } from "fs";

export default {
  name: "Home",
  components: {
    Story,
    TheSearch
  },
  data() {
    return {
      searchedStories: []
    };
  },
  methods: {
    getSearchedStories() {
      const stories = this.$store.state.searchedStories;
      this.searchedStories = stories;
    },
    fetchTopStories() {
      this.$store.dispatch("fetchTopStories");
    }
  },
  computed: {
    stories() {
      return this.searchedStories.length
        ? this.searchedStories
        : this.$store.state.topStories;
    },
    title() {
      return this.searchedStories.length
        ? "Top 10 Results For Your Search"
        : "Top 15 Hacker News";
      // create the logic to display the comments of the searched term
    }
  },
  created() {
    if (this.$store.state.topStories.length === 0) this.fetchTopStories();
  },
  watch: {
    search: "fetchTopStories"
  }
};
</script>

<style scoped>
.page-title {
  color: #ff6600;
}
</style>