/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import AllComments from '../repositories/AllComments';

export default class LoadMostRelevantComment {
  static execute(id) {
    const self = new LoadMostRelevantComment(id, AllComments.build());
    return self.execute();
  }

  constructor(id, comments) {
    this.id = id;
    this.comments = comments;
  }

  async execute() {
    return this.loadComment(this.id);
  }

  async loadComment(id) {
    const response = await this.comments.fetch(id);
    return response;
  }
}
