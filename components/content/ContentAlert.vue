<template>
  <div
    :class="{
      'not-prose rounded-md border p-4 text-sm': true,
      'border-yellow-300 bg-yellow-100 text-yellow-700 dark:border-yellow-400 dark:bg-yellow-200 dark:text-yellow-800':
        variant === 'warning',
      'border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-400 dark:bg-blue-200 dark:text-blue-800':
        variant === 'info',
    }"
    role="alert"
  >
    <div class="flex items-center">
      <Icon :name="icon" class="h-5 w-5 shrink-0" />
      <h3 class="ml-2 text-lg font-medium">{{ title }}</h3>
    </div>
    <div v-if="$slots.default" class="mt-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  variant: {
    type: String as PropType<"warning" | "info">,
    default: "warning",
  },
  icon: {
    type: String,
    default: "heroicons:information-circle-20-solid",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
