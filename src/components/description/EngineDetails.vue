<script setup>
import { defineProps, toRefs, computed } from 'vue'
import { isEmpty } from 'lodash'

const props = defineProps({
    description: Object
})

const { engine } = toRefs(props.description)

const engines = computed(() => {
    if (!engine.value) {
        return []
    }
    let engines = !isEmpty(engine.value[0]) ? engine.value : [ engine.value ]
    return engines.map(engine => {
        engine.displacements = []
        engine.displacements = !isEmpty(engine.displacement?.value) ? [ engine.displacement?.value ] : engine.displacements
        engine.displacements = !isEmpty(engine.displacement?.value[0]) ? engine.displacement?.value : engine.displacements
        return engine
    })
})
</script>

<template>
    <ul class="nav nav-tabs">
        <li v-for="(engine, index) in engines" :key="index" class="nav-item">
            <a class="nav-link" :class="index === 0 && 'active'" 
                @click.prevent
                data-bs-toggle="tab" 
                type="button" 
                role="tab" 
                :id="index+'-tab'"
                :data-bs-target="'#'+index+'-pane'">{{ engine.engineType._ }}</a>
        </li>
    </ul>
    <div class="tab-content">
        <div v-for="(engine, index) in engines" 
            :key="index" 
            class="tab-pane fade row" 
            :class="index === 0 && 'show active'" 
            role="tabpanel" 
            :aria-labelledby="index+'-tab'"
            :id="index+'-pane'">
            <div class="row">
                <dl class="row col-6">
                    <dt  class="col-sm-6">Cylinders</dt>
                    <dd  class="col-sm-6">{{ engine.cylinders }}</dd>

                    <dt  class="col-sm-6">Displacement</dt>
                    <dd  class="col-sm-6"><div v-for="(displacement, index) in engine.displacements" :key="index">{{ displacement._ + ' ' + displacement.unit }}</div></dd>

                    <dt  class="col-sm-6" v-if="engine.horsepower">Horsepower</dt>
                    <dd  class="col-sm-6" v-if="engine.horsepower">{{ engine.horsepower?.value + ' at ' + engine.horsepower?.rpm }} rpm</dd>

                    <dt  class="col-sm-6" v-if="engine.netTorque">Net Torque</dt>
                    <dd  class="col-sm-6" v-if="engine.netTorque">{{ engine.netTorque?.value + ' at ' + engine.netTorque?.rpm }} rpm</dd>

                    <dt  class="col-sm-6" v-if="engine.forcedInduction">Forced Induction</dt>
                    <dd  class="col-sm-6" v-if="engine.forcedInduction">{{ engine.forcedInduction?._ }}</dd>

                    <dt  class="col-sm-6">High Output</dt>
                    <dd  class="col-sm-6">{{ engine.highOutput ? 'Yes' : 'No' }}</dd>
                </dl>
                <dl class="row col-6">
                    <dt  class="col-sm-6">Fuel Type</dt>
                    <dd  class="col-sm-6">{{ engine.fuelType._ }}</dd>

                    <dt  class="col-sm-6" v-if="engine.fuelCapacity">Fuel Capacity</dt>
                    <dd  class="col-sm-6" v-if="engine.fuelCapacity">{{ engine.fuelCapacity?.low + ' - ' + engine.fuelCapacity?.high + ' ' + engine.fuelCapacity?.unit }}</dd>

                    <dt  class="col-sm-6" v-if="engine.fuelEconomy">Fuel Economy (City)</dt>
                    <dd  class="col-sm-6" v-if="engine.fuelEconomy">{{ engine.fuelEconomy?.city.low + ' - ' + engine.fuelEconomy?.city.high + ' ' + engine.fuelEconomy?.unit }}</dd>

                    <dt  class="col-sm-6" v-if="engine.fuelEconomy">Fuel Economy (Highway)</dt>
                    <dd  class="col-sm-6" v-if="engine.fuelEconomy">{{ engine.fuelEconomy?.hwy.low + ' - ' + engine.fuelEconomy?.hwy.high + ' ' + engine.fuelEconomy?.unit }}</dd>

                    <dt  class="col-sm-6">Installed</dt>
                    <dd  class="col-sm-6">{{ !isEmpty(engine.installed) ? 'Yes' : 'No' }}</dd>
                </dl>
            </div>
        </div>    
    </div>    
</template>