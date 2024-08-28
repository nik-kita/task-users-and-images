<script setup lang="ts">
import { fetch_usersList } from '@/fetch/users-list.fetch'

const props = withDefaults(
  defineProps<{
    limit?: number
    offset?: number
    orderDirection?: 'ASC' | 'DESC'
    orderBy?: 'user.id' | 'image_count'
  }>(),
  {
    limit: 10,
    orderBy: 'image_count',
    orderDirection: 'DESC',
    offset: 0
  }
)

const { users } = await fetch_usersList(props)
</script>
<template>
  <ul>
    <li v-for="u in users" :key="u.id">
      <pre>{{ u }}</pre>
    </li>
  </ul>
</template>
