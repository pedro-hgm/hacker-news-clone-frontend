import $http from '@/http-common';

export default class FetchItem {
  static execute(...args) {
    return new FetchItem($http, ...args).execute();
  }

  constructor(http, { id, uri }) {
    this.id = id;
    this.uri = uri;
    this.http = http;
  }

  async execute() {
    try {
      const item = await this.http.get(`${this.uri}/${this.id}`);
      return this.isValid(item);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  isValid(item) {
    return item.status === 200 ? item.data : false;
  }
}
