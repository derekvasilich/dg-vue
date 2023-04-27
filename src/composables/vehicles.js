import { ref, computed } from "vue"
import { vehicleService } from "@/services"
import { isEmpty } from 'lodash'
import { useException } from '@/composables/exceptions'
const currentVehicle = ref({})

const vehicles = ref([])
const selectedOptions = ref({})

const { setException } = useException()

const filters = ref({
    sort: undefined, 
    min: 0, 
    max: Infinity,
    query: undefined        
})

const page = ref(0)
const size = ref(100)
const isLoading = ref(false)

export const useVehicles = () => {
    const hasNextVehicle = computed(() => _currentIdx.value + 1 < filteredVehicles.value.length)   
    const hasPreviousVehicle = computed(() => _currentIdx.value - 1 > -1)   

    const _currentIdx = computed(() => filteredVehicles.value.findIndex(vehicle => vehicle.node.id === currentVehicle.value.id))

    const next = computed(() => hasNextVehicle.value ? filteredVehicles.value[_currentIdx.value + 1].node : null)    
    const prev = computed(() => hasPreviousVehicle.value ? filteredVehicles.value[_currentIdx.value - 1].node : null)    

    const nextVehicle = () => {
        next.value && getVehicleById(next.value.id)
    } 
    
    const previousVehicle = () => {
        prev.value && getVehicleById(prev.value.id)
    }

    const getPrevious = () => {
        if (page.value > 0) {
            page.value = page.value-1
            getVehicles({ force: true })
        }
    }

    const getNext = () => {
        page.value = page.value + 1
        getVehicles({ force: true })
    }

    const getPage = (pg) => {
        page.value = pg
        getVehicles({ force: true })
    }

    const filteredVehicles = computed(() => {
        if (typeof vehicles.value.map !== 'function' || typeof filters.value === 'undefined') {
            return []
        }
        let filtered = vehicles.value.filter(edge => {
            const vehicle = edge.node
            !vehicle.name && (vehicle.name = '')
            !vehicle.price && (vehicle.price = 0)
            if (parseFloat(vehicle.price) < parseFloat(filters.value.min)) {
                return false
            }
            if (parseFloat(vehicle.price) > parseFloat(filters.value.max)) {
                return false
            }
            if (typeof filters.value.query !== 'undefined' && vehicle.name.indexOf(filters.value.query) === -1) {
                return false
            }
            return true
        })
        if (typeof filters.value.sort !== 'undefined') {
            filtered.sort((nodea, nodeb) => {
                const a = nodea.node, b = nodeb.node
                !a.name && (a.name = '')
                !b.name && (b.name = '')
                !a.vin && (a.vin = '')
                !b.vin && (b.vin = '')
                switch (filters.value.sort) {
                    case 'id':      return parseInt(a.id) - parseInt(b.id);
                    case 'price':   return parseFloat(a.price) - parseFloat(b.price);
                    case 'name':    return a.name.localeCompare(b.name);
                    case 'vin':     return a.vin.localeCompare(b.vin);
                }
            })
        }
        return filtered
    })

    const minMaxPrice = computed(() => {
        if (vehicles.value.length === 0) {
            return [0, Infinity]
        }
        return vehicles.value.reduce((acc, edge) => {
            const vehicle = edge.node
            !vehicle.price && (vehicle.price = 0)
            acc[0] = ( parseFloat(vehicle.price) < acc[0] ) ? parseFloat(vehicle.price) : acc[0]
            acc[1] = ( parseFloat(vehicle.price) > acc[1] ) ? parseFloat(vehicle.price) : acc[1]
            return acc;
        }, [Infinity, 0])
    })

    const getVehicles = (opts = {}) => {
        const { force } = opts
        if (!force && !isEmpty(vehicles.value)) {
            return;
        }
        isLoading.value = true
        vehicleService.getAll({ page: page.value, size: size.value })
            .then((res) => {
                vehicles.value = res.data.data.allVehiclesPaginated.edges
//                selectedOptions.value = []
            })
            .catch((e) => setException(e))
            .finally(() => {
                isLoading.value = false
            })
    }
    
    const getVehicleById = (vehicleId) => {
        isLoading.value = true
        vehicleService.get(vehicleId)
            .then((res) => {
                currentVehicle.value = res.data.data.getVehicleById
            })
            .catch((e) => setException(e))
            .finally(() => {
                isLoading.value = false
            })
    }

    return {
        isLoading,
        page, 
        size,
        vehicles,
        filters,
        currentVehicle,
        filteredVehicles,
        minMaxPrice,
        getVehicles,
        getVehicleById,
        getPrevious,
        getNext,
        getPage,
        next,
        prev,
        nextVehicle,
        previousVehicle,
        hasNextVehicle,
        hasPreviousVehicle,
        selectedOptions
    }
}