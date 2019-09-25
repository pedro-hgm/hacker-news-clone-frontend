/* eslint-disable class-methods-use-this */
import FetchItem from '../integrations/backend/fetchItem';
import State from '../integrations/localState/state';

export default class AllStories {
  static build() {
    return new AllStories(FetchItem, State.build());
  }

  constructor(finder, state) {
    this.finder = finder;
    this.state = state;
    this.path = 'stories/show';
  }

  async fetch(id) {
    try {
      const story = await this.finder.execute({ id, uri: this.path });
      return story ? this.save(story) : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  save(story) {
    return this.state.saveStory(story);
  }
}
