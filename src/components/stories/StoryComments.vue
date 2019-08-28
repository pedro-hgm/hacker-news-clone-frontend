<template>
  <div v-if="comment">
    <div v-show="open">
      <p
        class="body-2 comment-by"
      >{{ comment.by }} {{ new Date(comment.time * 1000).toLocaleString('pt-BR', { timeZone: 'UTC' }) }}</p>
      <p>
        <span class="body-1 comment-text" v-html="comment.text"></span>
      </p>
      <div v-show="comment.kids" class="comment-children">
        <StoryComments v-for="id in comment.kids" :key="id" :id="id" :open="open" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoryComments",
  props: ["id", "open"],
  data() {
    return {
      comment: null
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await this.$store.dispatch(
          "fetchStoryComments",
          this.id
        );
        if (response) this.getComment();
      } catch (error) {
        console.log(error);
      }
    },
    getComment() {
      this.comment = this.$store.state.comments[this.id];
    }
  },
  created() {
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