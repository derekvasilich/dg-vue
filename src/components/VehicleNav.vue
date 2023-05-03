<script setup>
import { useVehicles } from "@/composables/vehicles";

const { page, isLoading, getPrevious, getNext, getPage } = useVehicles();
</script>

<template>
  <AppPagination
    :disabled="isLoading"
    :current-page="page"
    @previous="getPrevious()"
    @next="getNext()"
    @page="(page) => getPage(page)"
  />
</template>
