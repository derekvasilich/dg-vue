<script setup>
import { defineProps, defineEmits, toRefs, computed } from "vue";

const props = defineProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["previous", "next", "page"]);

const { disabled, currentPage } = toRefs(props);
const pageKeys = computed(() => {
  let first = currentPage.value - 5;
  if (first < 0) {
    first = 0;
  }
  return [...Array(10).keys()].map((i) => i + first);
});
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-between">
      <li class="page-item">
        <button
          :disabled="currentPage === 0"
          :class="currentPage === 0 && 'disabled'"
          class="page-link"
          tabindex="0"
          role="button"
          aria-label="Previous"
          @click="!disabled && emits('previous')"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li v-for="key in pageKeys" :key="key" class="page-item">
        <button
          class="page-link"
          tabindex="0"
          :class="currentPage === key && 'active'"
          @click="!disabled && emits('page', key)"
        >
          {{ key + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button
          tabindex="0"
          role="button"
          class="page-link"
          aria-label="Next"
          @click="!disabled && emits('next')"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.page-link {
  cursor: pointer;
}
</style>
