<script setup lang="ts">
import { fetch_usersList } from '@/fetch/users-list.fetch'

const props = withDefaults(
  defineProps<{
    limit?: number
    offset?: number
    order_direction?: 'ASC' | 'DESC'
    order_by?: 'user.name' | 'image_count' | 'user.updated_at'
  }>(),
  {
    limit: 10,
    order_by: 'image_count',
    order_direction: 'DESC',
    offset: 0,
  },
)

const { users } = await fetch_usersList(props)
</script>
<template>
  <ul>
    <li v-for="u in users" :key="u.id">
      <div class="grid grid-cols-3 gap-3 py-1">
        <slot v-bind="u">
          <pre>{{ u }}</pre>
        </slot>
      </div>
    </li>
  </ul>
</template>
