<template>
  <div>
    <v-card class="mb-3" flat>
      <v-card-title>
        <a :href="story.url" class="my-card-title">{{ story.title }}</a>
      </v-card-title>
      <v-card-text>
        by
        <a
          class="news-author"
          href="#"
        >{{ story.by }} {{ new Date(story.time * 1000).toLocaleString('pt-BR', { timeZone: 'UTC' }) }}</a>
      </v-card-text>
      <p text class="comments-count ml-4">{{ story.descendants || 0 }} Comments</p>
      <v-card-actions>
        <div class="ml-3" v-show="story.descendants > 0">
          <p
            class="more-comments"
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
      </v-card-actions>
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
  font-weight: bold;
  color: #455a64;
}

.news-author {
  color: #455a64;
}
.more-comments {
  color: #ef6c00;
}
</style>
