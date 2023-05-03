<script setup>
import { defineProps, toRefs, computed } from "vue";

const props = defineProps({
  description: Object,
});

const { standard } = toRefs(props.description);

const allEquipmentGrouped = computed(() => {
  return []
    .concat((standard && standard.value) || [])
    .reduce((accum, equip) => {
      let group = equip.definition?.group._ || equip.header?._;
      if (!accum.has(group)) {
        accum.set(group, []);
      }
      accum.get(group).push(equip);
      return accum;
    }, new Map());
});
const firstGroup = computed(
  () => allEquipmentGrouped.value.keys().next().value
);
</script>

<template>
  <ul class="nav nav-tabs">
    <li v-for="[index] in allEquipmentGrouped" :key="index" class="nav-item">
      <a
        :id="index + '-tab'"
        class="nav-link"
        :class="index === firstGroup && 'active'"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        :data-bs-target="'#' + index + '-pane'"
        @click.prevent
        >{{ index }}</a
      >
    </li>
  </ul>
  <div class="tab-content">
    <div
      v-for="[index, equip] in allEquipmentGrouped"
      :id="index + '-pane'"
      :key="index"
      class="tab-pane fade row"
      :class="index === firstGroup && 'show active'"
      role="tabpanel"
      :aria-labelledby="index + '-tab'"
    >
      <div class="row">
        <dl v-for="(item, index) in equip" :key="index" class="row col-6">
          <dt v-if="item.definition?.category._" class="col-sm-6">
            {{ item.definition?.header._ || item.description }}
          </dt>
          <dd v-if="item.definition?.category._" class="col-sm-6">
            {{ item.definition?.category._ }}
          </dd>
          <dt v-else>{{ item.definition?.header._ || item.description }}</dt>
        </dl>
      </div>
    </div>
  </div>
</template>
