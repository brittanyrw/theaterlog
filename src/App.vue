<template>
  <div id="app">
    <Hero />
    <Shows />
  </div>
</template>

<script>
import Shows from "./components/Shows.vue";
import Hero from "./components/Hero.vue";
export default {
  name: "app",
  components: {
    Shows,
    Hero
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Verdana";
  background-color: $purple;
  color: $black;
}

#app {
  background-color: $purple;
  border: 7px solid $black;
  box-shadow: 10px 10px 0 $black;
  border-radius: 7px 7px 7px 0;
  max-width: 1200px;
  margin: 50px auto;
  @media screen and (max-width: 1200px) {
    margin: 20px;
  }
}

ul {
  margin: 0;
  list-style: none;
  padding: 0;
  li {
    display: inline-block;
  }
}
</style>
