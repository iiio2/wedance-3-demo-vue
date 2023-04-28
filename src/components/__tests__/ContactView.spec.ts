import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactView from '@/views/ContactView.vue'

describe('ContactView', () => {
  it('renders properly', () => {
    const wrapper = mount(ContactView)
    expect(wrapper.text()).toContain('Lorem ipsum dolor sit amet consectetur adipisicing elit.')
  })
})
