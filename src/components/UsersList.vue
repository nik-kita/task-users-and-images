<script setup lang="ts">
import { fetch_usersList } from '@/fetch/users-list.fetch'

const { users } = await fetch_usersList()
</script>
<template>
  <div>
    <h1>Users List</h1>
    <ul>
      <li v-for="u in users" :key="u.id">
        <pre>{{ u }}</pre>
      </li>
    </ul>
  </div>
</template>
