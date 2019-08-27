import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topStories: [],
    storiesComments: new Set(),
  },
  mutations: {
    setTopStories: (state, story) => {
      state.topStories.push(story);
    },
    setStoryComments: (state, comment) => {
      if (comment === null) return;
      state.storiesComments.add(comment);
    },
  },
  actions: {
    fetchTopStories: async ({ commit }) => {
      try {
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topStoriesIds = response.data.slice(0, 15);
        topStoriesIds.forEach(async (id) => {
          try {
            const stories = await axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            );
            commit('setTopStories', stories.data);
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    fetchStoryComments: ({ commit }, commentsIds) => {
      commentsIds.forEach(async (id) => {
        try {
          const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          commit('setStoryComments', response.data);
        } catch (error) {
          console.log(error);
        }
      });
    },
  },
  getters: {
    comments(state) {
      return state.storiesComments;
    },
  },
});
