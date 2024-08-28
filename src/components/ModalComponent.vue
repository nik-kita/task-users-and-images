<script setup lang="ts">
import { FormKit } from '@formkit/vue'
const show = defineModel<boolean>()
</script>
<template>
  <div v-show="show" class="absolute top-0 z-10 w-full h-full bg-slate-500/90 flex">
    <slot></slot>
    <div class="fixed bottom-10 right-1/2">
      <FormKit type="button" @click="() => (show = false)" ignore>
        <h1>ok</h1>
      </FormKit>
    </div>
  </div>
</template>
