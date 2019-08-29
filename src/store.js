import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topStories: [],
    searchedStories: [],
    comments: {
      /* [comment.id: number]: comment */
    },
  },
  mutations: {
    setTopStories: (state, story) => {
      state.topStories.push(story);
    },
    setStoryComments: (state, comment) => {
      if (comment === null) return;
      state.comments[comment.id] = comment;
    },
    setSearchedStories: (state, searchedStories) => {
      const stories = searchedStories
        .filter((story) => {
          if (!story._tags.includes('ask_hn')) return story;
        })
        .map(story => ({
          title: story.title,
          url: story.url || '#',
          by: story.author,
          time: story.created_at_i,
          descendants: story.num_comments,
          kids: [],
        }));
      state.searchedStories = stories;
    },
  },
  actions: {
    fetchTopStories: async ({ commit }) => {
      // separar esse metodo em dois, um que pega os ids e outro que pega as topstories
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
    fetchStoriesByQuery: async ({ commit }, query) => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&hitsPerPage=10`,
        );
        if (response.data.hits.length) {
          commit('setSearchedStories', response.data.hits);
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  getters: {
    //
  },
});
