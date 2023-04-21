<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/auth';

const emailRegExp = /^[a-zA-Z0-9_]+[@][a-zA-Z0-9_]+[.][-a-zA-Z0-9._]+$/
const filters = ref({ email: null, password: null })
const isValid = computed(() => {
    return filters.value.email?.match(emailRegExp) && filters.value.password && filters.value.password.length > 0
})

const { error, login } = useAuth()
</script>

<template>
    <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div v-if="error" className="alert alert-danger" role="alert">
                {{ error.status }}: {{ error.message }}
            </div>                
            <div class="form-floating mb-3">
                <input type="email"
                    class="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                    v-model="filters.email" />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" 
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="filters.password"
                    class="form-control" />
                <label for="floatingPassword">Password</label>
            </div>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button @click="login(filters)" 
                :disabled="!isValid" 
                class="w-100 btn btn-lg btn-primary" 
                type="submit">Login</button>
            <hr class="my-4">
            <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
        </form>
    </div>
</template>

<style scoped>
.form-floating > .form-control:focus ~ label::after, 
.form-floating > .form-control:not(:placeholder-shown) ~ label::after, 
.form-floating > .form-control-plaintext ~ label::after, 
.form-floating > .form-select ~ label::after {
    background-color: transparent;
}
</style>