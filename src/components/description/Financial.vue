<script setup>
import { defineProps, toRefs, computed } from "vue";
import { formatCurrency, formatPriceRange } from "@/utils";
import { useVehicles } from "@/composables/vehicles";
import { isEmpty } from "lodash";

const props = defineProps({
  description: Object,
  vehicle: Object,
});
const { description, vehicle } = toRefs(props);
const { basePrice, factoryOption } = toRefs(description.value);
const { selectedOptions } = useVehicles();

const optionsPrice = computed(() => {
  return [].concat((factoryOption && factoryOption.value) || []).reduce(
    (total, option) => {
      let { chromeCode, price } = option;
      if (selectedOptions.value[chromeCode]) {
        total.low += price.invoiceMin || price.msrpMin || 0;
        total.high += price.invoiceMax || price.msrpMax || 0;
      }
      return total;
    },
    { low: 0, high: 0 }
  );
});

const vehiclePrice = computed(() => {
  const base =
    basePrice.value.invoice?.low || basePrice.value.msrp?.low || vehicle.price;
  const destination = basePrice.value.destination?.low || 0;
  return base + optionsPrice.value?.low + destination;
});
</script>

<template>
  <div>
    <h1 class="card-title">
      {{ formatCurrency(vehiclePrice) }}
    </h1>
    <ul>
      <dt v-if="basePrice.msrp">MSRP</dt>
      <dd v-if="basePrice.msrp">{{ formatPriceRange(basePrice.msrp) }}</dd>

      <dt v-if="basePrice.invoice?.low">Invoice</dt>
      <dd v-if="basePrice.invoice?.low">
        {{ formatPriceRange(basePrice.invoice) }}
      </dd>

      <dt v-if="basePrice.destination">Destination</dt>
      <dd v-if="basePrice.destination">
        {{ formatPriceRange(basePrice.destination) }}
      </dd>

      <dt v-if="!isEmpty(selectedOptions)">Factory Options</dt>
      <dd v-if="!isEmpty(selectedOptions)">
        {{ formatPriceRange(optionsPrice) }}
      </dd>
    </ul>
  </div>
</template>
