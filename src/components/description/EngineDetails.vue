<script setup>
import { defineProps, toRefs, computed } from "vue";
import { isEmpty } from "lodash";

const props = defineProps({
  description: {
    type: Object,
    default: () => {},
  },
});

const { engine } = toRefs(props.description);

const engines = computed(() => {
  if (!engine.value) {
    return [];
  }
  let engines = !isEmpty(engine.value[0]) ? engine.value : [engine.value];
  return engines.map((engine) => {
    engine.displacements = [];
    engine.displacements = !isEmpty(engine.displacement?.value)
      ? [engine.displacement?.value]
      : engine.displacements;
    engine.displacements = !isEmpty(engine.displacement?.value[0])
      ? engine.displacement?.value
      : engine.displacements;
    return engine;
  });
});
</script>

<template>
  <ul class="nav nav-tabs">
    <li v-for="(engine, index) in engines" :key="index" class="nav-item">
      <a
        :id="index + '-tab'"
        class="nav-link"
        :class="index === 0 && 'active'"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        :data-bs-target="'#' + index + '-pane'"
        @click.prevent
        >{{ engine.engineType._ }}</a
      >
    </li>
  </ul>
  <div class="tab-content">
    <div
      v-for="(engine, index) in engines"
      :id="index + '-pane'"
      :key="index"
      class="tab-pane fade row"
      :class="index === 0 && 'show active'"
      role="tabpanel"
      :aria-labelledby="index + '-tab'"
    >
      <div class="row">
        <dl class="row col-6">
          <dt class="col-sm-6">Cylinders</dt>
          <dd class="col-sm-6">{{ engine.cylinders }}</dd>

          <dt class="col-sm-6">Displacement</dt>
          <dd class="col-sm-6">
            <div
              v-for="(displacement, index) in engine.displacements"
              :key="index"
            >
              {{ displacement._ + " " + displacement.unit }}
            </div>
          </dd>

          <dt v-if="engine.horsepower" class="col-sm-6">Horsepower</dt>
          <dd v-if="engine.horsepower" class="col-sm-6">
            {{ engine.horsepower?.value + " at " + engine.horsepower?.rpm }} rpm
          </dd>

          <dt v-if="engine.netTorque" class="col-sm-6">Net Torque</dt>
          <dd v-if="engine.netTorque" class="col-sm-6">
            {{ engine.netTorque?.value + " at " + engine.netTorque?.rpm }} rpm
          </dd>

          <dt v-if="engine.forcedInduction" class="col-sm-6">
            Forced Induction
          </dt>
          <dd v-if="engine.forcedInduction" class="col-sm-6">
            {{ engine.forcedInduction?._ }}
          </dd>

          <dt class="col-sm-6">High Output</dt>
          <dd class="col-sm-6">{{ engine.highOutput ? "Yes" : "No" }}</dd>
        </dl>
        <dl class="row col-6">
          <dt class="col-sm-6">Fuel Type</dt>
          <dd class="col-sm-6">{{ engine.fuelType._ }}</dd>

          <dt v-if="engine.fuelCapacity" class="col-sm-6">Fuel Capacity</dt>
          <dd v-if="engine.fuelCapacity" class="col-sm-6">
            {{
              engine.fuelCapacity?.low +
              " - " +
              engine.fuelCapacity?.high +
              " " +
              engine.fuelCapacity?.unit
            }}
          </dd>

          <dt v-if="engine.fuelEconomy" class="col-sm-6">
            Fuel Economy (City)
          </dt>
          <dd v-if="engine.fuelEconomy" class="col-sm-6">
            {{
              engine.fuelEconomy?.city.low +
              " - " +
              engine.fuelEconomy?.city.high +
              " " +
              engine.fuelEconomy?.unit
            }}
          </dd>

          <dt v-if="engine.fuelEconomy" class="col-sm-6">
            Fuel Economy (Highway)
          </dt>
          <dd v-if="engine.fuelEconomy" class="col-sm-6">
            {{
              engine.fuelEconomy?.hwy.low +
              " - " +
              engine.fuelEconomy?.hwy.high +
              " " +
              engine.fuelEconomy?.unit
            }}
          </dd>

          <dt class="col-sm-6">Installed</dt>
          <dd class="col-sm-6">
            {{ !isEmpty(engine.installed) ? "Yes" : "No" }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
