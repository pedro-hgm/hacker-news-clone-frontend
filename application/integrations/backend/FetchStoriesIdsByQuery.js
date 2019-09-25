import HTTP from '@/http-common';

export default class FetchStoriesIdsByQuery {
  static execute(query) {
    const self = new FetchStoriesIdsByQuery(query, HTTP);
    return self.execute();
  }

  constructor(query, http) {
    this.query = query;
    this.uri = 'stories/search';
    this.http = http;
  }

  async execute() {
    try {
      const response = await this.http.post(this.uri, { query: this.query });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
