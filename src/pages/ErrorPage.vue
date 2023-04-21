<script setup>
import { useException } from '@/composables/exceptions'

const { error } = useException()
</script>

<template>
    <div v-if="error">
        <div className="alert alert-danger" role="alert">
            {{ error.response.status }}: {{ error.message }}
            <small>
                {{ error.toString() }}
            </small>
        </div>  
    </div>
</template>