<script setup>
import { defineProps, onMounted } from "vue";
import { useVehicles } from "@/composables/vehicles";
import VehicleDetails from "@/components/VehicleDetails.vue";
import Financial from "@/components/description/Financial.vue";
import { formatCurrency, formatVIN } from "@/utils";
import VehicleCarousel from "@/components/VehicleCarousel.vue";

const props = defineProps({
  vehicleId: {
    type: String,
    default: null,
  },
});

const {
  isLoading,
  currentVehicle,
  getVehicleById,
  nextVehicle,
  previousVehicle,
  prev,
  next,
  hasNextVehicle,
  hasPreviousVehicle,
} = useVehicles();

onMounted(() => getVehicleById(props.vehicleId));
</script>

<template>
  <div>
    <div v-if="isLoading">
      <AppSpinner />
    </div>
    <div v-else class="card mb-4 shadow-sm">
      <div class="card-header">
        <ul class="nav">
          <li class="nav-item" style="max-width: 200px">
            <a
              :disabled="!hasPreviousVehicle"
              :class="!hasPreviousVehicle && 'disabled'"
              class="btn btn-sm btn-outline-primary"
              @click="previousVehicle()"
            >
              <i class="fa fa-chevron-left"></i> «
              <span class="text-truncate">{{ prev?.name || prev?.vin }}</span>
            </a>
          </li>
          <li class="nav-item flex-fill">
            <h4 class="my-0 fw-normal text-center">
              {{ currentVehicle.name || currentVehicle.vin }}
            </h4>
            <small>{{ formatVIN(currentVehicle.vin) }}</small>
          </li>
          <li
            class="nav-item"
            :class="!hasNextVehicle && 'disabled'"
            style="max-width: 200px"
          >
            <a
              :disabled="!hasNextVehicle"
              :class="!hasNextVehicle && 'disabled'"
              class="btn btn-sm btn-outline-primary"
              @click="nextVehicle()"
            >
              <i class="fa fa-chevron-left"></i>
              <span>{{ next?.name || next?.vin }}</span> »
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="row">
          <VehicleCarousel class="col-md-8" :current-vehicle="currentVehicle" />
          <Financial
            v-if="currentVehicle?.description?.description"
            class="col-md-4"
            :vehicle="currentVehicle"
            :description="currentVehicle?.description?.description"
          />
        </div>
        <VehicleDetails
          v-if="currentVehicle?.description?.description"
          :vehicle="currentVehicle"
          :description="currentVehicle.description.description"
        />
        <a href="?#/vehicles" class="w-100 btn btn-primary">
          <i className="fa fa-chevron-left"></i> Back to Vehicles
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
