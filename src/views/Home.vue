<template>
  <div>
    <TheSearch @query="setSearchedStories" />
    <v-container fluid>
      <v-row class="mx-10">
        <v-col cols="12">
          <div class="page-title headline font-weight-bold my-5">{{ title }}</div>
          <Spinner
            line-fg-color="#ff6600"
            v-show="!stories.length"
            size="medium"
            message="Loading..."
          ></Spinner>

          <Story v-for="story in stories" :key="story.id" :story="story" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Story from "../components/stories/Story";
import TheSearch from "../components/layout/TheSearch";
import Spinner from "vue-simple-spinner";

export default {
  name: "Home",
  components: {
    Story,
    TheSearch,
    Spinner
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
  }
};
</script>

<style scoped>
.page-title {
  color: #ff6600;
}
</style>