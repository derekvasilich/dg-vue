<script setup>
import { defineProps, defineEmits, toRefs, computed } from 'vue'

const props = defineProps({
    disabled: Boolean,
    currentPage: Number
})

const emits = defineEmits(['previous', 'next', 'page'])

const { disabled, currentPage } = toRefs(props)
const pageKeys = computed(() => {
    let first = currentPage.value - 5
    if (first < 0) {
        first = 0;
    }
    return [...Array(10).keys()].map(i => i + first)
})
</script>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination d-flex justify-content-between">
            <li class="page-item">
                <button :disabled="currentPage === 0" 
                    :class="currentPage === 0 && 'disabled'"
                    @click="!disabled && emits('previous')" 
                    class="page-link" 
                    tabindex="0"
                    role="button"
                    aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li v-for="key in pageKeys" :key="key" class="page-item">
                <button
                    class="page-link" 
                    @click="!disabled && emits('page', key)" 
                    tabindex="0"
                    :class="currentPage === key && 'active'">{{ key+1 }}</button>
            </li>
            <li class="page-item">
                <button
                    @click="!disabled && emits('next')" 
                    tabindex="0"
                    role="button"
                    class="page-link" 
                    aria-label="Next">
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