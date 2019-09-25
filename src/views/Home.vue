<template>
  <div>
    <TheSearch @query="setSearchedStoriesIds" />
    <v-container fluid>
      <v-row class="mx-10">
        <v-col cols="12">
          <div class="page-title headline font-weight-bold my-5">{{ title }}</div>
          <Spinner
            line-fg-color="#ff6600"
            v-show="!storiesIds.length"
            size="medium"
            message="Loading..."
          ></Spinner>
          <div v-if="searchedStoriesIds.length > 0">
            <Story v-for="id in searchedStoriesIds" :key="id" :id="id" />
          </div>
          <div v-else>
            <Story v-for="id in storiesIds" :key="id" :id="id" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Story from "../components/stories/Story";
import TheSearch from "../components/layout/TheSearch";
import Spinner from "vue-simple-spinner";
import UseCase from "../../application/useCases/LoadTopStories";
import UseCase2 from "../../application/useCases/searchStories";

export default {
  name: "Home",
  components: {
    Story,
    TheSearch,
    Spinner
  },
  data() {
    return {
      searchedStoriesIds: [],
      storiesIds: [],
      useCase: UseCase.build(),
      useCase2: UseCase2.build()
    };
  },
  methods: {
     setSearchedStoriesIds(ids) {
      this.searchedStoriesIds = ids;
    },
    async fetchStories() {
      this.storiesIds = await this.useCase.topStoriesIds();
    }
  },
  computed: {
    stories() {
      return this.searchedStoriesIds.length
        ? this.searchedStoriesIds
        : this.storiesIds;
    },
    title() {
      return this.searchedStoriesIds.length
        ? "Top 10 Results For Your Search"
        : "Top 15 Hacker News";
    }
  },
  created() {
    this.fetchStories();
  }
};
</script>

<style scoped>
.page-title {
  color: #ff6600;
}
</style>