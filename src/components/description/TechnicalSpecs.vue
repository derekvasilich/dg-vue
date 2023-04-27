<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    description: Object
})

const { technicalSpecification } = toRefs(props.description)
</script>

<template>
    <div class="row">
        <dl v-for="(item, index) in technicalSpecification || []" 
            :key="index"
            class="row col-6">
            <dt class="col-sm-6">{{ item.definition?.title._ }}</dt>
            <dd class="col-sm-6">{{ item.value.value + ' ' + item.definition?.measurementUnit }}</dd>
        </dl>
    </div>
</template>