import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EditProfileView from '@/views/EditProfileView.vue'

test('should exist', async () => {
  const wrapper = mount(EditProfileView)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('does-not-exist').exists()).toBe(false)
})
