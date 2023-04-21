import { createRouter, createWebHashHistory } from 'vue-router'
import SignIn from '@/pages/SignIn.vue'
import VehicleList from '@/pages/VehicleList.vue'
import VehicleDisplay from '@/pages/VehicleDisplay.vue'
import ErrorPage from '@/pages/ErrorPage.vue'

const routes = [
    { path: '/', name: 'signIn', component: SignIn },
    { path: '/error', name: 'error', component: ErrorPage },
    { path: '/vehicles', name: 'vehicles', component: VehicleList },
    { path: '/vehicles/:vehicleId', name: 'displayVehicle', component: VehicleDisplay, props: true }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router