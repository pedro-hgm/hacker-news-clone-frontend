<template>
  <div v-if="story">
    <v-card class="mb-5" flat>
      <v-card-title>
        <a :href="story.url" class="my-card-title title font-weight-bold ml-2">{{ story.title }}</a>
      </v-card-title>
      <v-card-text>
        <p class="ml-2">
          by
          <span class="story-by">{{ story.author }} {{ story.date }}</span>
        </p>
        <p
          text
          class="comments-count body-1 font-weight-bold ml-2"
        >{{ story.comments_count }} Comments</p>
        <div class="ml-2" v-show="story.comments.length > 0">
          <p
            class="more-comments body-1"
            @click="open = !open"
          >{{ open ? '- Hide' : '+ Show'}} most relevant comments</p>
          <Spinner line-fg-color="#ff6600" v-show="loading" size="medium" message="Loading..."></Spinner>
          <StoryComments
            v-for="id in story.comments"
            :key="id"
            :id="id"
            :open="open"
            @loading="setLoading"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import StoryComments from "./StoryComments";
import Spinner from "vue-simple-spinner";
import UseCase from "../../../application/useCases/LoadTopStories";

export default {
  name: "Story",
  props: ["id"],
  components: {
    StoryComments,
    Spinner
  },
  data() {
    return {
      open: false,
      loading: false,
      story: null,
      useCase: UseCase.build()
    };
  },
  methods: {
    async fetchStory() {
      this.story = await this.useCase.execute(this.id);
    },
    setLoading(payload) {
      this.loading = payload;
    }
  },
  created() {
    this.fetchStory();
  }
};
</script>

<style scoped>
.my-card-title {
  text-decoration: none;
  color: #455a64;
  font-weight: bold;
}
.comments-count {
  color: #455a64;
}

.story-by {
  color: #455a64;
  text-decoration: underline;
}
.more-comments {
  color: #ff6600;
  cursor: pointer;
}
</style>
