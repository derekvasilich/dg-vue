<script setup>
import { defineProps, toRefs, computed, ref, onMounted } from "vue";
import { kebabCase, isArray, isEmpty } from "lodash";
import { Tooltip } from "bootstrap";
import { useVehicles } from "@/composables/vehicles";

const props = defineProps({
  description: Object,
});

const { factoryOption, exteriorColor, interiorColor, genericColor } = toRefs(
  props.description
);
const { selectedOptions } = useVehicles();

const allColors = computed(() => {
  return []
    .concat((exteriorColor && exteriorColor.value) || [])
    .concat((interiorColor && interiorColor.value) || [])
    .concat((genericColor && genericColor.value) || []);
});

const factoryOptionsGrouped = computed(() => {
  if (!factoryOption || !isArray(factoryOption.value)) {
    return [];
  }
  return factoryOption.value.reduce((accum, opt) => {
    let group = opt.header?._;
    if (!accum.has(group)) {
      accum.set(group, []);
    }
    accum.get(group).push(opt);
    return accum;
  }, new Map());
});
const firstGroup = computed(
  () => factoryOptionsGrouped.value.keys().next().value
);
const optionTabContent = ref(null);

const colorSwatchStyle = (chromeCode) => {
  const color = allColors.value.find((color) => color.colorCode === chromeCode);
  if (color && color.rgbValue) {
    return {
      "background-color": `#${color.rgbValue}`,
      color: "white",
      "text-align": "center",
    };
  }
  return {};
};

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipArr = [...tooltipTriggerList];
  tooltipArr.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
});
</script>

<template>
  <ul class="nav nav-tabs">
    <li v-for="[index] in factoryOptionsGrouped" :key="index" class="nav-item">
      <a
        :id="`${kebabCase(index)}-tab`"
        class="nav-link"
        :class="index === firstGroup && 'active'"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        :data-bs-target="`#${kebabCase(index)}-pane`"
        @click.prevent
        >{{ index }}</a
      >
    </li>
  </ul>
  <div :ref="optionTabContent" class="tab-content">
    <div
      v-for="[index, equip] in factoryOptionsGrouped"
      :id="`${kebabCase(index)}-pane`"
      :key="kebabCase(index)"
      class="tab-pane fade row"
      :class="index === firstGroup && 'show active'"
      role="tabpanel"
      :aria-labelledby="`${kebabCase(index)}-tab`"
    >
      <div class="row">
        <ul v-for="(item, idx) in equip" :key="idx" class="list-group col-6">
          <li class="list-group-item d-flex">
            <input
              :id="`checkbox-${index}-${idx}`"
              v-model="selectedOptions[item.chromeCode]"
              class="form-check-input me-1"
              :type="item.optionKindId ? 'radio' : 'checkbox'"
              :value="true"
              :name="item.optionKindId"
            />
            />
            <label
              class="form-check-label flex-fill"
              :for="`checkbox-${index}-${idx}`"
            >
              <span
                v-if="isArray(item.description)"
                data-bs-toggle="tooltip"
                :title="item.description[1]"
                >{{ item.description[0] }}
                <i class="bi bi-info-circle"></i>
              </span>
              <div
                v-else-if="!isEmpty(colorSwatchStyle(item.chromeCode))"
                class="p-2 rounded-2 w-100"
                :style="colorSwatchStyle(item.chromeCode)"
              >
                {{ item.description }}
              </div>
              <span v-else>{{ item.description }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  border: 0;
}
</style>
