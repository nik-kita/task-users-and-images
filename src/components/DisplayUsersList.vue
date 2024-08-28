<script setup lang="ts">
import UsersList from './UsersList.vue'
import { ref, computed } from 'vue'

const orderDirection = ref<'ASC' | 'DESC'>('DESC')
const limit = ref(10)
const options = computed(() => {
  return JSON.stringify({
    orderDirection: orderDirection.value,
    limit: limit.value
  })
})
</script>
<template>
  <div>
    <div>
      <button @click="() => (orderDirection = orderDirection === 'ASC' ? 'DESC' : 'ASC')">
        {{ 'Total images' }}
      </button>
      <button @click="() => (limit = limit === 10 ? 20 : 10)">{{ 'Limit' }}</button>
    </div>
    <Suspense :key="options">
      <template #default>
        <UsersList :limit />
      </template>
      <template #fallback>
        <pre>Loading...</pre>
      </template>
    </Suspense>
  </div>
</template>
