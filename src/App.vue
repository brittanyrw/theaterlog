<template>
  <div id="app">
    <Roof/>
    <Hero/>
    <Shows/>
    <BoxOffice/>
  </div>
</template>

<script>

import Shows from './components/Shows.vue'
import Hero from './components/Hero.vue'
import BoxOffice from './components/BoxOffice.vue'
import Roof from './components/Roof.vue'
export default {
  name: 'app',
  components: {
    Shows,
    Hero,
    BoxOffice,
    Roof
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Amaranth:700|Lato');

* {
  box-sizing: border-box;
}

body {
  padding: 30px;
  background-color: #9994E1;
  font-family: 'Lato', sans-serif;
  font-size: 21px;
  position: relative;
  margin: 0;
}

h1, ul {
  margin: 0;
}

p {
  margin: 10px auto;
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
 /* font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #402e47;
  max-width: 1000px;
  margin: auto;
}

@media screen and (max-width: 425px){
  body {
    padding: 10px;
  }
}

</style>
