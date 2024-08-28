<script setup lang="ts">
import { fetch_createUser } from '@/fetch/create-user.fetch'
import { FormKit } from '@formkit/vue'

const handleSubmit = async ({
  name,
  city,
  image
}: {
  name: string
  city: string
  image?: [File]
}) => {
  try {
    await fetch_createUser({
      name,
      city,
      ...(image && { image: image[0] })
    })
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <h1>Create new</h1>
  <FormKit type="form" @submit="handleSubmit">
    <div class="flex gap-4">
      <FormKit type="text" name="name" label="Name" validation="required" />
      <FormKit type="text" name="city" label="From" validation="required" />
    </div>
    <FormKit type="file" name="image" accept=".png,.jpg" label="Image" />
  </FormKit>
</template>
