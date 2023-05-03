<script setup>
import VehicleFilters from "@/components/VehicleFilters.vue";
import VehicleItem from "@/components/VehicleItem.vue";
import VehicleNav from "@/components/VehicleNav.vue";
import { useVehicles } from "@/composables/vehicles";
import { onMounted } from "vue";

const { isLoading, filteredVehicles, getVehicles } = useVehicles();

onMounted(() => getVehicles());
</script>

<template>
  <VehicleFilters />
  <VehicleNav />
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="text-align: left">Name</th>
        <th style="text-align: right">Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td colspan="3">
          <AppSpinner />
        </td>
      </tr>
      <tr v-for="vehicle in filteredVehicles" v-else :key="vehicle.node.id">
        <VehicleItem :vehicle="vehicle.node" />
      </tr>
    </tbody>
  </table>
  <VehicleNav />
</template>

<style scoped></style>
