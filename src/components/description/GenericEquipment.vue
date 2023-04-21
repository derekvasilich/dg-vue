<script setup>
import { defineProps, toRefs, computed } from 'vue'

const props = defineProps({
    description: Object
})

const { genericEquipment } = toRefs(props.description)

const genericEquipmentGrouped = computed(() => {
    if (!genericEquipment.value) {
        return []
    }
    return genericEquipment.value.reduce((accum, equip) => {
        let group = equip.definition.group._
        if (!accum.has(group)) {
            accum.set(group, [])
        }
        accum.get(group).push(equip)
        return accum
    }, new Map())
})
const firstGroup = computed(() => genericEquipmentGrouped.value.keys().next().value)
</script>

<template>
    <ul class="nav nav-tabs">
        <li v-for="([index]) in genericEquipmentGrouped" :key="index" class="nav-item">
            <a class="nav-link" :class="index === firstGroup && 'active'" 
                @click.prevent
                data-bs-toggle="tab" 
                type="button" 
                role="tab" 
                :id="index+'-tab'"
                :data-bs-target="'#'+index+'-pane'">{{ index }}</a>
        </li>
    </ul>
    <div class="tab-content">
        <div v-for="([index, equip]) in genericEquipmentGrouped" 
            :key="index" 
            class="tab-pane fade row" 
            :class="index === firstGroup && 'show active'" 
            role="tabpanel" 
            :aria-labelledby="index+'-tab'"
            :id="index+'-pane'">
            <div class="row">
                <dl v-for="(item, index) in equip" 
                    :key="index"
                    class="row col-6">
                    <dt  class="col-sm-6">{{ item.definition.header._ }}</dt>
                    <dd  class="col-sm-6">{{ item.definition.category._ }}</dd>
                </dl>
            </div>
        </div>    
    </div>    
</template>