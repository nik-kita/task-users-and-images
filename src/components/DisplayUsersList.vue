<script setup lang="ts">
import UsersList from './UsersList.vue'
import { ref, computed } from 'vue'

const order_direction = ref<'ASC' | 'DESC'>('DESC')
const limit = ref(10)
const options = computed(() => {
  return JSON.stringify({
    order_direction: order_direction.value,
    limit: limit.value
  })
})
</script>
<template>
  <div>
    <div class="flex gap-2">
      <button @click="() => (order_direction = order_direction === 'ASC' ? 'DESC' : 'ASC')">
        {{ 'Total images' }}
      </button>
      <button @click="() => (limit = limit === 100 ? 200 : 100)">{{ 'Limit' }}</button>
    </div>
    <Suspense :key="options">
      <template #default>
        <UsersList :limit :order_direction #default="{ name }">
          <h4>{{ name }}</h4>
        </UsersList>
      </template>
      <template #fallback>
        <pre>Loading...</pre>
      </template>
    </Suspense>
  </div>
</template>
