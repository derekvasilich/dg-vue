<script setup>
import { isEmpty } from "lodash";
import { defineProps, toRefs, shallowRef, computed } from "vue";

import ConsumerInformation from "./description/ConsumerInformation.vue";
import EngineDetails from "./description/EngineDetails.vue";
import FactoryOptions from "./description/FactoryOptions.vue";
import GenericEquipment from "./description/GenericEquipment.vue";
import Standard from "./description/Standard.vue";
import TechnicalSpecs from "./description/TechnicalSpecs.vue";

const props = defineProps({
  description: {
    type: Object,
    default: () => {},
  },
  vehicle: {
    type: Object,
    default: () => {},
  },
});

const { description } = toRefs(props);
const items = shallowRef([
  { title: "Factory Options", component: FactoryOptions },
  { title: "Engine Details", component: EngineDetails },
  { title: "Standard Equipment", component: Standard },
  { title: "Generic Equipment", component: GenericEquipment },
  { title: "Consumer Information", component: ConsumerInformation },
  { title: "Technical Specifications", component: TechnicalSpecs },
]);
const hasData = computed(() => [
  !isEmpty(description.value.factoryOption),
  !isEmpty(description.value.engine),
  !isEmpty(description.value.standard),
  !isEmpty(description.value.genericEquipment),
  !isEmpty(description.value.consumerInformation),
  !isEmpty(description.value.technicalSpecification),
]);
</script>

<template>
  <div id="accordionExample" class="accordion">
    <template v-for="(item, index) in items" :key="index">
      <div
        v-if="hasData[index]"
        class="accordion-item"
        style="border: transparent"
      >
        <h2 class="accordion-header" style="margin-bottom: 10px">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse-' + index"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {{ item.title }}
          </button>
        </h2>
        <div
          :id="'collapse-' + index"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <component :is="item.component" :description="description" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
:deep .nav-tabs {
  margin-bottom: 10px;
}
</style>
