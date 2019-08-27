<template>
  <div>
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header
          class="toggle-comments"
          @click="open = !open"
        >{{ open ? '- Hide' : '+ Show'}} most relevant comments</v-expansion-panel-header>
        <div v-for="(comment, index) in comments" :key="index">
          <v-expansion-panel-content>
            <p
              class="body-2 comment-by"
            >{{ comment.by }} {{ new Date(comment.time * 1000).toLocaleString('pt-BR', { timeZone: 'UTC' }) }}</p>
            <p>
              <span class="body-1 comment-text" v-html="comment.text"></span>
            </p>
            <div v-show="comment.kids" class="comment-children">
              <StoryComments v-for="id in comment.kids" :key="id" :commentsIds="[id]" />
            </div>
          </v-expansion-panel-content>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "StoryComments",
  props: ["commentsIds"],
  data() {
    return {
      open: false
    };
  },
  computed: {
    comments() {
      if (!this.open) return;
      const ids = this.commentsIds;
      const comments = Array.from(this.$store.getters.comments);
      const filteredComments = comments.filter(comment => {
        if (ids.includes(comment.id)) {
          return comment;
        }
      });
      console.log(filteredComments);
      return filteredComments;
    }
  },
  methods: {
    fetchComments() {
      if (this.open) return;
      this.$store.dispatch("fetchStoryComments", this.commentsIds);
    }
  },
  beforeMount() {
    this.fetchComments();
  }
};
</script>

<style scoped>
.toggle-comments {
  color: #ef6c00;
}
.comment-by {
  text-decoration: underline;
  color: #424242;
}
.comment-text {
  color: #424242;
}
.comment-children {
  margin-left: 1.5em;
}
</style>