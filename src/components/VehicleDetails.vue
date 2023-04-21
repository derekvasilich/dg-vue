<script setup>
import { defineProps, toRefs, ref } from 'vue'
import ConsumerInformation from './description/ConsumerInformation.vue';
import EngineDetails from './description/EngineDetails.vue';
import FactoryOptions from './description/FactoryOptions.vue';
import GenericEquipment from './description/GenericEquipment.vue';
import TechnicalSpecs from './description/TechnicalSpecs.vue';

const props = defineProps({
    description: Object,
    vehicle: Object
})

const { description } = toRefs(props) 
const items = ref([
    {title: 'Factory Options', component: FactoryOptions},
    {title: 'Engine Details', component: EngineDetails},
    {title: 'Generic Equipment', component: GenericEquipment},
    {title: 'Consumer Information', component: ConsumerInformation},
    {title: 'Technical Specifications', component: TechnicalSpecs},
])
</script>

<template>
    <div class="accordion" id="accordionExample">
        <div v-for="(item, index) in items" 
            :key="index"
            class="accordion-item"
            style="border: transparent">
            <h2 class="accordion-header" style="margin-bottom: 10px">
                <button class="accordion-button" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    :data-bs-target="'#collapse-'+index" 
                    aria-expanded="true" 
                    aria-controls="collapseOne">
                    {{ item.title }}
                </button>
            </h2>
            <div :id="'collapse-'+index" 
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample">
                <component :is="item.component" :description="description" />
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep .nav-tabs {
    margin-bottom: 10px
}
</style>