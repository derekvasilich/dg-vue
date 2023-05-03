<script setup>
import { defineProps, toRefs, computed } from "vue";
import { kebabCase, isEmpty, isArray } from "lodash";

const props = defineProps({
  description: {
    type: Object,
    default: () => {},
  },
});

const { consumerInformation } = toRefs(props.description);

const consumerInformationArr = computed(() => {
  if (isEmpty(consumerInformation.value)) {
    return [];
  }
  return isArray(consumerInformation.value)
    ? consumerInformation.value
    : [consumerInformation.value];
});

const consumerInformationGrouped = computed(() => {
  return consumerInformationArr.value.reduce((accum, opt) => {
    let group = opt.type._;
    accum.set(group, opt.item);
    return accum;
  }, new Map());
});
const firstGroup = computed(
  () => consumerInformationGrouped.value.keys().next().value
);
</script>

<template>
  <ul class="nav nav-tabs">
    <li
      v-for="[index] in consumerInformationGrouped"
      :key="index"
      class="nav-item"
    >
      <a
        :id="kebabCase(index) + '-tab'"
        class="nav-link"
        :class="index === firstGroup && 'active'"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        :data-bs-target="'#' + kebabCase(index) + '-pane'"
        @click.prevent
        >{{ index }}</a
      >
    </li>
  </ul>
  <div class="tab-content">
    <div
      v-for="[index, equip] in consumerInformationGrouped"
      :id="kebabCase(index) + '-pane'"
      :key="kebabCase(index)"
      class="tab-pane fade row"
      :class="index === firstGroup && 'show active'"
      role="tabpanel"
      :aria-labelledby="kebabCase(index) + '-tab'"
    >
      <div class="row">
        <dl v-for="(item, index) in equip" :key="index" class="row col-6">
          <dt class="col-sm-6">{{ item.name }}</dt>
          <dd class="col-sm-6">{{ item.value }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
