<script setup>
import { computed } from "vue";
import { useAuth } from "@/composables/auth";
import router from "@/router";

const { logout } = useAuth();
const currentRoute = computed(() => {
  return router.currentRoute.value.name;
});
const isNative = computed(() => {
  return typeof NativeWebInterface !== "undefined";
});
</script>

<template>
  <header
    v-if="!isNative"
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
  >
    <p class="h5 my-0 me-md-auto fw-bold">
      Dealer<i
        class="fa fa-cog fa-lg`"
        :style="{ 'vertical-align': '-4px', color: '#3a87ad' }"
      ></i
      >Gears
    </p>
    <nav class="my-2 my-md-0 me-md-3">
      <a
        v-if="currentRoute == 'signIn'"
        href="#/"
        class="btn btn-outline-primary"
        >Login</a
      >
      <div v-else>
        <a href="#/vehicles" class="p-2 text-dark">Vehicles</a>
        <a class="btn btn-outline-secondary" @click="logout()">Logout</a>
      </div>
    </nav>
  </header>
  <div v-else>&nbsp;</div>
</template>

<style scoped></style>
