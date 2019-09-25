import mainStore from '../../../src/store';

export default class State {
  static build() {
    return new State(mainStore);
  }

  constructor(store) {
    this.store = store;
  }

  saveStory(story) {
    this.store.commit('setStory', story);
    return this.showStory(story.id);
  }

  saveComment(comment) {
    this.store.commit('setStoryComments', comment);
    return this.showComment(comment.id);
  }

  saveSearchedStory(story) {
    this.store.commit('setSearchedStory', story);
    return this.showSearchedStory(story.id);
  }

  showComment(id) {
    const comment = this.store.state.comments[id];
    return comment || false;
  }

  showStory(id) {
    const story = this.store.state.stories[id];
    return story || false;
  }

  showSearchedStory(id) {
    const story = this.store.state.searchedStories[id];
    return story || false;
  }
}
