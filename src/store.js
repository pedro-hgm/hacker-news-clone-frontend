import Vue from 'vue';
import Vuex from 'vuex';
import { HTTP } from './http-common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stories: [],
    searchedStories: [],
    comments: {
      /* [comment.id: integer]: comment */
    },
  },
  mutations: {
    setStories: (state, { story, search }) => {
      search ? state.searchedStories.push(story) : state.stories.push(story);
    },
    setStoryComments: (state, comment) => {
      if (comment === null) return;
      state.comments[comment.id] = comment;
    },
  },
  actions: {
    fetchStoriesIds: async ({ dispatch }) => {
      try {
        const response = await HTTP.get('stories/index');
        dispatch({
          type: 'fetchStories',
          ids: response.data,
          search: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    fetchStories: ({ commit }, { ids, search }) => {
      ids.forEach(async (id) => {
        try {
          const response = await HTTP.get(`stories/show/${id}`);
          commit('setStories', { story: response.data, search });
        } catch (error) {
          console.log(error);
        }
      });
    },
    fetchStoriesByQuery: async ({ dispatch }, query) => {
      try {
        const url = 'stories/search';
        const response = await HTTP.post(url, { query });
        dispatch({
          type: 'fetchStories',
          ids: response.data,
          search: true,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    fetchStoryComments: async ({ commit }, id) => {
      try {
        const url = `stories/comment/${id}`;
        const response = await HTTP.get(url);
        commit('setStoryComments', response.data);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  getters: {
    stories(state) {
      return state.stories;
    },
  },
});
