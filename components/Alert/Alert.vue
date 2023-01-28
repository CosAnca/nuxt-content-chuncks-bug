<template>
  <div v-if="visible" :class="alertClasses" role="alert">
    <div :class="inline ? 'flex' : 'flex items-center'">
      <Icon
        v-if="icon"
        name="heroicons:information-circle-20-solid"
        :class="['flex-shrink-0', 'w-5', 'h-5', textClasses]"
      />
      <span v-if="title" :class="titleClasses">
        {{ title }}
      </span>
      <button
        v-if="!inline && closable"
        type="button"
        :class="closeClasses"
        aria-label="Close"
        @click="onCloseClick"
      >
        <span class="sr-only">{{ $t("dismiss") }}</span>
        <Icon name="heroicons:x-mark-20-solid" class="h-5 w-5" />
      </button>
    </div>
    <div :class="contentClasses">
      <slot />
    </div>
    <div v-if="$slots.actions" class="inline-flex items-center">
      <slot name="actions" />
    </div>
    <button
      v-if="inline && closable"
      type="button"
      :class="closeClasses"
      aria-label="Close"
      @click="onCloseClick"
    >
      <span class="sr-only">{{ $t("dismiss") }}</span>
      <Icon name="heroicons:x-mark-20-solid" class="h-5 w-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { ref, toRefs } from "vue";
import { useAlertClasses } from "./composables/useAlertClasses";
import type { AlertType } from "./types";

const props = defineProps({
  type: {
    type: String as PropType<AlertType>,
    default: "info",
  },
  title: {
    type: String,
    default: "",
  },
  closable: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: true,
  },
  inline: {
    type: Boolean,
    default: true,
  },
});

const {
  alertClasses,
  textClasses,
  closeClasses,
  contentClasses,
  titleClasses,
} = useAlertClasses(toRefs(props));

const visible = ref(true);

const onCloseClick = () => {
  visible.value = false;
};
</script>
