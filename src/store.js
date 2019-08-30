import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { async } from 'q';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stories: [],
    searchedStories: [],
    comments: {
      /* [comment.id: number]: comment */
    },
    topStoriesUrl: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  },
  mutations: {
    setStories: (state, { story, search }) => {
      if (search) {
        state.searchedStories.push(story);
      } else {
        state.stories.push(story);
      }
    },
    setStoryComments: (state, comment) => {
      if (comment === null) return;
      state.comments[comment.id] = comment;
    },
  },
  actions: {
    fetchStoriesIds: async ({ dispatch }, { url, search }) => {
      try {
        if (!search) {
          const response = await axios.get(url);
          const ids = response.data.slice(0, 15);
          dispatch('fetchStories', { ids, search });
        } else {
          const response = await axios.get(url);
          if (response.data.hits.length) {
            const ids = response.data.hits.map(object => parseInt(object.objectID, 10));
            dispatch('fetchStories', { ids, search });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    fetchStories: ({ commit }, { ids, search }) => {
      ids.forEach(async (id) => {
        try {
          const stories = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          console.log(stories.data);
          commit('setStories', { story: stories.data, search });
        } catch (error) {
          console.log(error);
        }
      });
    },
    fetchStoriesByQuery: ({ dispatch }, query) => {
      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&hitsPerPage=10`;
      const search = true;
      dispatch('fetchStoriesIds', { url, search });
      return true;
    },
    fetchStoryComments: async ({ commit }, id) => {
      try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
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
