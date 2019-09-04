<template>
  <div>
    <div v-if="comment">
      <div class="ml-2" v-show="open">
        <hr />
        <p class="body-2 comment-by">{{ comment.author }} {{ comment.date }}</p>
        <p>
          <span class="body-1 comment-text" v-html="comment.text"></span>
        </p>
        <div v-if="comment.nested" class="comment-nested">
          <StoryComments
            v-for="id in comment.nested"
            :key="id"
            :id="id"
            :open="open"
            :nested="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoryComments",
  props: ["id", "open", "nested"],
  data() {
    return {
      comment: null,
      valid: true
    };
  },
  computed: {
    shouldFetchComments() {
      if (!this.comment && this.open && this.valid) return true;
    }
  },
  methods: {
    async fetchComments() {
      this.$emit("loading", true);
      try {
        const response = await this.$store.dispatch(
          "fetchStoryComments",
          this.id
        );
        this.getComment(response);
      } catch (error) {
        console.log(error);
      }
      this.$emit("loading", false);
    },
    getComment(response) {
      response
        ? (this.comment = this.$store.state.comments[this.id])
        : (this.valid = false);
    }
  },
  created() {
    if (this.nested) this.fetchComments();
  },
  watch: {
    open() {
      if (this.shouldFetchComments) this.fetchComments();
    }
  }
};
</script>

<style scoped>
.comment-by {
  text-decoration: underline;
  color: #424242;
}
.comment-text {
  color: #424242;
}
.comment-nested {
  margin-left: 1.5em;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
</style>