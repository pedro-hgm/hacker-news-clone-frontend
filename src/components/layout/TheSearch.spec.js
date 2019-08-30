import { shallowMount } from '@vue/test-utils';
import TheSearch from './TheSearch.vue';

describe('TheSearch', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TheSearch);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
