import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router.js'
import AppSpinner from '@/components/global/AppSpinner.vue'
import AppPagination from '@/components/global/AppPagination.vue'
import AppCarousel from '@/components/global/AppCarousel.vue'
import '@/scss/style.scss'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
require('bootstrap-icons/font/bootstrap-icons.css');

const app = createApp(App)

// Register Components
app
    .component('AppSpinner', AppSpinner)
    .component('AppPagination', AppPagination)
    .component('AppCarousel', AppCarousel)

app.use(router)
app.mount('#app')