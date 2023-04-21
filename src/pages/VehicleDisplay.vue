<script setup>
import { defineProps, onMounted } from 'vue';
import { useVehicles } from '@/composables/vehicles';
import VehicleDetails from '@/components/VehicleDetails.vue';
import { formatCurrency, formatVIN } from '@/utils'
import VehicleCarousel from '@/components/VehicleCarousel.vue';

const props = defineProps({
    vehicleId: String
})

const { isLoading, currentVehicle, getVehicleById, nextVehicle, previousVehicle, prev, next, hasNextVehicle, hasPreviousVehicle } = useVehicles()

onMounted(() => getVehicleById(props.vehicleId) )
</script>

<template>
    <div>
        <div v-if="isLoading">
            <AppSpinner/>
        </div>
        <div v-else class="card mb-4 shadow-sm">
            <div class="card-header">
                <ul class="nav">
                    <li class="nav-item" style="max-width: 200px;">
                        <a @click="previousVehicle()" 
                            :disabled="!hasPreviousVehicle"
                            :class="!hasPreviousVehicle && 'disabled'"
                            class="btn btn-sm btn-outline-primary">
                            <i class="fa fa-chevron-left"></i> « <span class="text-truncate">{{ prev?.name || prev?.vin }}</span>
                        </a>
                    </li>
                    <li class="nav-item flex-fill">
                        <h4 class="my-0 fw-normal">{{ currentVehicle.name || currentVehicle.vin }}</h4>
                    </li>
                    <li class="nav-item" :class="!hasNextVehicle && 'disabled'" style="max-width: 200px;">
                        <a @click="nextVehicle()" 
                            :disabled="!hasNextVehicle"
                            :class="!hasNextVehicle && 'disabled'"
                            class="btn btn-sm btn-outline-primary">
                            <i class="fa fa-chevron-left"></i> <span>{{ next?.name || next?.vin }}</span> »
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
            <h1 class="card-title pricing-card-title">{{ formatCurrency(currentVehicle.price) }}</h1>
                <VehicleCarousel :current-vehicle="currentVehicle" />
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{{ currentVehicle.id }}</td>
                        </tr>
                        <tr>
                            <td>VIN</td>
                            <td>{{ formatVIN(currentVehicle.vin) }}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{{ currentVehicle.name }}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{{ formatCurrency(currentVehicle.price) }}</td>
                        </tr>
                    </tbody>
                </table>
                <VehicleDetails v-if="currentVehicle?.description?.description" 
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

<style scoped>

</style>