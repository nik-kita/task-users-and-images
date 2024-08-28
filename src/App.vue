<script setup lang="ts">
import UsersList from './components/UsersList.vue'
</script>

<template>
  <section>
    <Suspense>
      <template #default>
        <UsersList />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </section>
</template>
