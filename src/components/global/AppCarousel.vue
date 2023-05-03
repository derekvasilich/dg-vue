<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  images: Array,
  showControls: Boolean,
  showIndicators: Boolean,
});

const { images, showControls, showIndicators } = toRefs(props);
</script>

<template>
  <div id="carouselExampleIndicators" class="carousel slide">
    <div v-if="showIndicators" class="carousel-indicators">
      <button
        v-for="(image, index) in images"
        :key="index"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        :class="index === 0 ? 'active' : ''"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel-item"
        :class="index === 0 ? 'active' : ''"
      >
        <img :src="image.url" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      v-if="showControls"
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      v-if="showControls"
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
