import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stories: {},
    searchedStories: {},
    comments: {
      /* [comment.id: integer]: comment */
    },
  },
  mutations: {
    setStoryComments: (state, comment) => {
      if (!comment) return;
      state.comments[comment.id] = comment;
    },
    setStory: (state, story) => {
      if (!story) return;
      state.stories[story.id] = story;
    },
    setSearchedStory: (state, { story }) => {
      if (!story) return;
      state.searchedStories[story.id] = story;
    },
  },
});
