<template>
  <div>
    <TheSearch @query="setSearchedStories" />
    <v-container>
      <div class="mx-12">
        <div class="page-title headline font-weight-bold my-5">{{ title }}</div>
        <Story v-for="story in stories" :key="story.id" :story="story" />
      </div>
    </v-container>
  </div>
</template>

<script>
import Story from "../components/stories/Story";
import TheSearch from "../components/layout/TheSearch";

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
    setSearchedStories() {
      this.searchedStories = this.$store.state.searchedStories;
    },
    fetchStories() {
      this.$store.dispatch("fetchStoriesIds");
    }
  },
  computed: {
    stories() {
      return this.searchedStories.length
        ? this.searchedStories
        : this.$store.state.stories;
    },
    title() {
      return this.searchedStories.length
        ? "Top 10 Results For Your Search"
        : "Top 15 Hacker News";
    }
  },
  created() {
    if (this.$store.state.stories.length === 0) this.fetchStories();
  },
};
</script>

<style scoped>
.page-title {
  color: #ff6600;
}
</style>