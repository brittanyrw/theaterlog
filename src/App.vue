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

@import url('https://fonts.googleapis.com/css?family=Amaranth:700|Lato');

* {
  box-sizing: border-box;
}

body {
  padding: 30px;
  background-color: #7e8dd6;
  font-family: 'Lato', sans-serif;
  font-size: 21px;
  position: relative;
  margin: 0;
}

ul {
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
  text-align: center;
  color: #402e47;
  max-width: 1000px;
  margin: 100px auto auto auto;
}

@media screen and (max-width: 425px){
  body {
    padding: 10px;
  }
}

</style>
