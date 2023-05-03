<script setup>
import router from "@/router";
import { formatCurrency, formatVIN } from "@/utils";
import { toRefs, defineProps } from "vue";

const props = defineProps({
  vehicle: {
    type: Object,
    default: () => {},
  },
});

const { vehicle } = toRefs(props);

const handleVehicleClick = (vehicleId) => {
  router.push({ name: "displayVehicle", params: { vehicleId } });
};
</script>

<template>
  <td style="text-align: left">
    {{ vehicle.name }}
    <div>
      <small style="font-family: monospace">{{ formatVIN(vehicle.vin) }}</small>
    </div>
  </td>
  <td style="text-align: right">{{ formatCurrency(vehicle.price) }}</td>
  <td style="text-align: right">
    <a class="btn btn-outline-primary" @click="handleVehicleClick(vehicle.id)"
      >View</a
    >
  </td>
</template>

<style scoped></style>
