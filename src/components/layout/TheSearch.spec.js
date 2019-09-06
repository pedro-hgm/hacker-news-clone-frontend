import { mount } from '@vue/test-utils';
import TheSearch from './TheSearch.vue';

describe('TheSearch', () => {
  const wrapper = mount(TheSearch, {
    propsData: {
      query: '',
      placeholder: 'test',
    },
  });

  it('has an input field', () => {
    const inputField = wrapper.find('v-text-field');
    expect(inputField.exists()).toBe(true);
  });
});
