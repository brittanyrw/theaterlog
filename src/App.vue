<template>
  <div id="app">
    <HelloWorld msg="Coming Soon :)"/>
    <Statistics/>
    <Shows/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Shows from './components/Shows.vue'
import Statistics from './components/Statistics.vue'
export default {
  name: 'app',
  components: {
    HelloWorld,
    Shows,
    Statistics
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
