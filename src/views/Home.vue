<template>
  <div>
    <TheSearch />
    <v-container>
      <div class="mx-12">
        <div class="page-title headline font-weight-bold my-5">Top 15 Hacker News</div>
        <Story v-for="story in topStories" :key="story.id" :story="story" />
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
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
      //
    };
  },

  computed: {
    topStories() {
      return this.$store.state.topStories;
    }
  },
  created() {
    if (this.$store.state.topStories.length === 0)
      this.$store.dispatch("fetchTopStories");
  }
};
</script>

<style scoped>
.page-title {
  color: #ff6600;
}
</style>