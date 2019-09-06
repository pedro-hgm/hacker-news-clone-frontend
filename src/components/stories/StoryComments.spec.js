import { shallowMount } from '@vue/test-utils';
import StoryComments from './StoryComments.vue';

describe('Story', () => {
  const wrapper = shallowMount(StoryComments, {
    propsData: {
      open: true,
      valid: true,
    },
  });

  it('renders the comment if a comment is passed as a prop', () => {
    wrapper.setData({
      comment: {
        id: 20890008,
        author: 'bluetomcat',
        text: 'Once you understand the type declaration syntax via the “declarations mirror use”',
        date: '05/09/2019 16:35:03',
        nested: [20890128],
      },
    });
    const comment = wrapper.vm.comment.text;
    expect(wrapper.text()).toMatch(comment);
  });
});
