import AllStories from '../repositories/AllStories';
import FetchStoriesIds from '../integrations/backend/fetchStoriesIds';

export default class LoadTopStories {
  static build() {
    return new LoadTopStories(FetchStoriesIds, AllStories.build());
  }

  constructor(ids, stories) {
    this.ids = ids;
    this.stories = stories;
  }

  async execute(id) {
    return this.loadStory(id);
  }

  async loadStory(id) {
    const response = await this.stories.fetch(id);
    return response;
  }

  async topStoriesIds() {
    const ids = await this.ids.execute();
    return ids;
  }
}
