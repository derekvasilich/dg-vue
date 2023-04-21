<template>
  <app-header></app-header>
  <main className="container">
    <div className="row-fluid">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import AppHeader from '@/components/global/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
