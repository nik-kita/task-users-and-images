<script setup lang="ts">
import { useThrottle } from '@vueuse/core'
import { computed, ref } from 'vue'
import UsersList from './UsersList.vue'

const is_asc = ref(false)
const order_direction = computed(() => (is_asc.value ? 'ASC' : 'DESC'))
const order_by = ref<'user.name' | 'image_count'>('image_count')
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
  <div class="font-mono bg-gray-300 flex justify-between pr-5">
    <div>
      <div>
        Display
        <input @keypress.enter="() => (limitWithThrottle = limit)" type="number" v-model="limit" />
        users skipping
        <input
          @keypress.enter="() => (offsetWithThrottle = offset)"
          type="number"
          v-model="offset"
        />
      </div>
      <div>
        ordering by
        <select v-model="order_by">
          <option :value="'user.name'">name</option>
          <option :value="'image_count'">images count</option>
        </select>
      </div>
    </div>

    <div>
      <label class="px-2" for="order-direction-checkbox">From less</label>
      <input id="order-direction-checkbox" type="checkbox" v-model="is_asc" :value="false" />
    </div>
  </div>
  <Suspense :key="options">
    <template #default>
      <UsersList :limit :offset :order_direction :order_by #default="{ name, city, image_count }">
        <div class="flex justify-between">
          <p>{{ name }} from {{ city }} has</p>
          <p class="text-start">{{ image_count }} images.</p>
        </div>
      </UsersList>
    </template>
    <template #fallback>
      <pre>Loading...</pre>
    </template>
  </Suspense>
</template>

<style scoped>
input[type='number'] {
  width: 4em;
  @apply bg-stone-100;
}
</style>
