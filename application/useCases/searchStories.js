import AllStories from '../repositories/AllStories';
import FetchStoriesIdsByQuery from '../integrations/backend/FetchStoriesIdsByQuery';

export default class SearchStories {
  static build() {
    return new SearchStories(FetchStoriesIdsByQuery, AllStories.build());
  }

  constructor(finder, stories) {
    this.finder = finder;
    this.stories = stories;
  }

  async execute(id) {
    return this.loadStory(id);
  }

  async loadStory(id) {
    const response = await this.stories.fetch(id);
    return response;
  }

  async getStoriesIdsByQuery(query) {
    const ids = await this.finder.execute(query);
    return ids;
  }
}
