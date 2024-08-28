<script setup lang="ts">
import { useThrottle } from '@vueuse/core'
import { computed, ref } from 'vue'
import UsersList from './UsersList.vue'

const is_asc = ref(false)
const order_direction = computed(() => (is_asc.value ? 'ASC' : 'DESC'))
const order_by = ref<'user.name' | 'image_count' | 'user.updated_at'>('image_count')
const limit = ref(10)
const limitWithThrottle = useThrottle(limit, 2000)
const offset = ref(0)
const offsetWithThrottle = useThrottle(offset, 2000)
const options = computed(() => {
  return JSON.stringify({
    order_by: order_by.value,
    order_direction: order_direction.value,
    limit: limitWithThrottle.value,
    offset: offsetWithThrottle.value
  })
})
</script>
<template>
  <h1>Users</h1>
  <div class="text-xl bg-gray-300 flex justify-around pr-4 py-2">
    <div>
      Display<input
        @keypress.enter="() => (limitWithThrottle = limit)"
        type="number"
        v-model="limit"
      />
      skipping
      <input @keypress.enter="() => (offsetWithThrottle = offset)" type="number" v-model="offset" />
      ordering by
    </div>
    <div>
      <select v-model="order_by">
        <option :value="'user.updated_at'">user creation</option>
        <option :value="'user.name'">user name</option>
        <option :value="'image_count'">images count</option>
      </select>
    </div>
    <label class="px-2" for="order-direction-checkbox">Reverse order</label>
    <input id="order-direction-checkbox" type="checkbox" v-model="is_asc" :value="true" />
  </div>
  <Suspense :key="options">
    <template #default>
      <UsersList
        :limit
        :offset
        :order_direction
        :order_by
        #default="{ name, city, image_count, updated_at }"
      >
        <p>{{ name }} from {{ city }}</p>
        <a href="#" class="text-center italic p-1 bg-slate-100"> {{ image_count }} images </a>
        <p>updated at {{ updated_at }}</p>
      </UsersList>
    </template>
    <template #fallback>
      <pre>Loading...</pre>
    </template>
  </Suspense>
</template>

<style scoped>
input[type='number'] {
  width: 4rem;
  @apply bg-stone-100;
}
</style>
