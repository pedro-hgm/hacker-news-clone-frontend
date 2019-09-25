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
import useCase from "../../../application/useCases/LoadMostRelevantComment";
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
    shouldFetchComment() {
      if (!this.comment && this.open && this.valid) return true;
    }
  },
  methods: {
    async fetchComment() {
      this.$emit("loading", true);
      try {
        const response = await useCase.execute(this.id);
        this.setComment(response);
      } catch (error) {
        console.log(error);
      }
      this.$emit("loading", false);
    },
    setComment(comment) {
      comment ? (this.comment = comment) : (this.valid = false);
    }
  },
  created() {
    if (this.nested) this.fetchComment();
  },
  watch: {
    open() {
      if (this.shouldFetchComment) this.fetchComment();
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