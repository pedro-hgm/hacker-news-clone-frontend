import HTTP from '@/http-common';

export default class FetchStoriesIds {
  static execute() {
    const self = new FetchStoriesIds(HTTP);
    return self.execute();
  }

  constructor(http) {
    this.url = 'stories/index';
    this.http = http;
  }

  async execute() {
    try {
      const response = await this.http.get(this.url);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
