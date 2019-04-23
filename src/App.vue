<template>
  <div id="app">
    <Hero/>
    <Shows/>
    <BoxOffice/>
  </div>
</template>

<script>
import Shows from './components/Shows.vue'
import Hero from './components/Hero.vue'
import BoxOffice from './components/BoxOffice.vue'
export default {
  name: 'app',
  components: {
    Shows,
    Hero,
    BoxOffice
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

body {
  padding: 30px;
  background-color: #283747;
}

h1, ul {
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: inline-block;
  padding-right: 5px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1000px;
  margin: auto;
  border: 2px solid #A39594;
}

@media screen and (max-width: 425px){
  body {
    padding: 10px;
  }
}

</style>
