<template>
  <div class="shows">
    <div v-for="(show) in shows" v-bind:key="show.name"> {{ show.name }} </div>
  </div>
</template>

<script>

import {showList} from "../data/shows";

export default {
  name: 'Shows',
  data: function () {
    return {
      shows: showList
    }
  }
}
</script>