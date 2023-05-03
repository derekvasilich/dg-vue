<script setup>
import { computed } from "vue";
import { isEmpty } from "lodash";

const props = defineProps({
  currentVehicle: {
    type: Object,
    default: () => {},
  },
});

const images = computed(() => {
  let stockImages = [];
  if (props.currentVehicle?.description?.description?.style) {
    let styles = !isEmpty(
      props.currentVehicle?.description?.description?.style[0]
    )
      ? props.currentVehicle?.description?.description?.style
      : [props.currentVehicle?.description?.description?.style];
    stockImages = styles.map((style) => {
      return {
        ...style.stockImage,
        alt:
          props.currentVehicle.name ||
          `${style.division._} ${style.model._} ${style.name}`,
      };
    });
  }
  return stockImages;
});
</script>

<template>
  <AppCarousel
    :images="images"
    :show-indicators="images.length > 1"
    :show-controls="images.length > 1"
  />
</template>
