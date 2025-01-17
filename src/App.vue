<template>
  <main id="main">
    <HeroSection :shows="shows" :theaters="theaters" />
    <ShowList :shows="shows" />
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import ShowList from './components/ShowList.vue';
import HeroSection from './components/HeroSection.vue';
import data from './data/data.json';

export default {
  components: {
    ShowList,
    HeroSection,
  },
  setup() {
    const shows = ref([]);
    const theaters = ref([]);


    onMounted(async () => {
      shows.value = data.data.showCollection.items;
      theaters.value = data.data.theaterCollection.items;
    });

    return {
      shows,
      theaters,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Verdana";
  background-color: var(--purple);
  color: var(--black);
}

#main {
  background-color: var(--purple);
  border: 7px solid var(--black);
  box-shadow: 10px 10px 0 var(--black);
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