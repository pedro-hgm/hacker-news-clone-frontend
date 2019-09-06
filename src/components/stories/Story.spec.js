import { shallowMount } from '@vue/test-utils';
import Story from './Story.vue';

describe('Story', () => {
  const wrapper = shallowMount(Story, {
    propsData: {
      open: false,
      loading: false,
      story: {
        id: 20886458,
        title: 'Mystery surrounds lost German sea data station',
        url: 'https://www.bbc.co.uk/news/world-europe-49592330',
        author: 'bauc',
        date: '05/09/2019 10:31:58',
        comments: [20887655, 20886993, 20886783, 20887074],
        comments_count: 70,
      },
    },
  });

  it('changes the open status when the button is clicked', () => {
    const button = wrapper.find('p.more-comments');
    expect(wrapper.vm.open).toBe(false);
    button.trigger('click');
    expect(wrapper.vm.open).toBe(true);
  });

  it('changes the loading status when the action is dispatched', () => {
    expect(wrapper.vm.loading).toBe(false);
    wrapper.vm.setLoading(true);
    expect(wrapper.vm.loading).toBe(true);
  });

  it('renders the story.title if a story is passed as a prop', () => {
    expect(wrapper.text()).toMatch(/Mystery surrounds lost German sea data station/);
  });
});
