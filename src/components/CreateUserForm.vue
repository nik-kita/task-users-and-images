<script setup lang="ts">
import { FormKit } from '@formkit/vue'
</script>
<template>
  <h1>Create new</h1>
  <FormKit type="form">
    <FormKit type="text" name="name" label="Name" />
    <FormKit type="text" name="cityl" label="From" />
  </FormKit>
</template>
