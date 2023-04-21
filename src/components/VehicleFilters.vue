<script setup>
import { computed } from 'vue'
import { useVehicles } from '@/composables/vehicles';
import { formatCurrency } from '@/utils'

const { isLoading, minMaxPrice, filteredVehicles, filters } = useVehicles()
const sortOptions = [
    ['','Select...'],
    ['id','ID'], 
    ['name','Name'], 
    ['vin','Vin'], 
    ['price','Price']
]
const queryDetails = computed(() => {
    return isLoading.value ? '' : formatCurrency(filters.value.min || minMaxPrice.value[0]) + ' - ' + formatCurrency(filters.value.max || minMaxPrice.value[1])
})
</script>

<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item" style="border: transparent">
            <h2 class="accordion-header" style="margin-bottom: 10px">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Found {{filteredVehicles.length}} {{filters.query ? "&#8220;"+filters.query+"&#8221;" : "" }} vehicles {{ queryDetails }}
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-x">
                    <div class="form-floating mb-3">
                        <input class="form-control"
                            id="floatingQuery" 
                            placeholder="Search"
                            v-model="filters.query"
                            :disabled="isLoading"
                        />
                        <label for="floatingQuery" class="form-label">Search</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select 
                            id="floatingSort"
                            placeholder="Sort By"
                            v-model="filters.sort"
                            class="form-select"
                            :disabled="isLoading"
                        >
                            <option v-for="option in sortOptions" :key="option[0]" :value="option[0]">{{ option[1] }}</option>
                        </select>
                        <label if="floatingSort" class="form-label">Sort by</label>
                    </div>
                    <div class="mb-3">
                        <label for="customRange" class="form-label">Minimum Price</label>
                        <input type="range" 
                            id="customRange"
                            class="form-range" 
                            v-model="filters.min"
                            :disabled="isLoading"
                            :min="minMaxPrice[0]"
                            :max="minMaxPrice[1]"
                        />	
                    </div>        
                    <div class="mb-3">
                        <label for="customRange2" class="form-label">Maximum Price</label>
                        <input type="range"
                            class="form-range"
                            v-model="filters.max"
                            :disabled="isLoading"
                            :min="minMaxPrice[0]"
                            :max="minMaxPrice[1]"
                        />	
                    </div>  
                </div>
            </div>
        </div>
    </div>      
</template>