<template>
  <div id="app">
    <Hero/>
    <Shows/>
  </div>
</template>

<script>
import Shows from './components/Shows.vue'
import Hero from './components/Hero.vue'
export default {
  name: 'app',
  components: {
    Shows,
    Hero
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
