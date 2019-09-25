/* eslint-disable class-methods-use-this */
import FetchItem from '../integrations/backend/fetchItem';
import State from '../integrations/localState/state';

export default class AllComments {
  static build() {
    return new AllComments(FetchItem, State.build());
  }

  constructor(finder, state) {
    this.finder = finder;
    this.state = state;
    this.path = 'stories/comment';
  }

  async fetch(id) {
    try {
      const comment = await this.finder.execute({ id, uri: this.path });
      return comment ? this.save(comment) : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  save(comment) {
    return this.state.saveComment(comment);
  }

  getById(id) {
    this.state.showComment(id);
  }
}
