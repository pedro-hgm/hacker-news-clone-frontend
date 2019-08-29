<template>
  <div>
    <v-card class="mb-5" flat>
      <v-card-title>
        <a :href="story.url" class="my-card-title title font-weight-bold ml-2">{{ story.title }}</a>
      </v-card-title>
      <v-card-text>
        <p class="ml-2">
          by
          <span class="story-by">{{ story.by }} {{ storyTime }}</span>
        </p>
        <p
          text
          class="comments-count body-1 font-weight-bold ml-2"
        >{{ story.descendants || 0 }} Comments</p>
        <div class="ml-2" v-show="story.descendants > 0">
          <p
            class="more-comments body-1"
            @click="open = !open"
          >{{ open ? '- Hide' : '+ Show'}} most relevant comments</p>
          <p v-show="loading">loading...</p>
          <StoryComments
            v-for="id in story.kids"
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

export default {
  name: "Story",
  props: ["story"],
  components: {
    StoryComments
  },
  data() {
    return {
      open: false,
      loading: false
    };
  },
  computed: {
    storyTime() {
      return new Date(this.story.time * 1000).toLocaleString("pt-BR");
    }
  },
  methods: {
    setLoading(payload) {
      this.loading = payload;
    }
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
