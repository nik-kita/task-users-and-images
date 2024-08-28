<script setup lang="ts">
import { API_URL } from '@/const'

const props = defineProps<{
  user_id: number
}>()
console.log(props)

const data = (await fetch(API_URL + '/api/users/images/' + props.user_id).then((r) =>
  r.json()
)) as {
  images: string[]
}
</script>
<template>
  <ul class="justify-center gap-2 flex flex-wrap overflow-scroll w-full h-full">
    <li v-for="image in data.images" :key="image">
      <img :src="image" />
    </li>
  </ul>
</template>
