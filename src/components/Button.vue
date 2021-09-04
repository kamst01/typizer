<template>
  <button
    class="px-3 py-2 bg-blue-600 text-white text-base font-semibold rounded"
    @click="$emit('clickTarget')"
  >
      <slot></slot>
  </button>
</template>

<script>
export default {
    emits: ['clickTarget']
}
</script>