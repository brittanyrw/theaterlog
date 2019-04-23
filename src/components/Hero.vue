<template>
  <div class="statistics">
				
	<h1>Broadway in CSS</h1>
	<p>My earliest musical theater memory is from 5th grade. My parents had bought me a VHS copy of Grease that I carried around in my backpack, forcing friends to watch it with me after school. Since then, I have had a special love for plays and musicals. I created TheaterLog to keep track of which shows I have seen since 2010, when I first started watching shows on my own.</p>
	<div class="stats">
		<h2>Statistics</h2>
		<p class="counter">Total Shows Seen: {{ shows.length + 26}}</p>
		<p class="counter">Upcoming: {{ upcomingCounter }}</p>
		<p class="counter">Musicals: {{ musicalsCounter + 26}}</p>
		<p class="counter">Plays: {{ playsCounter}}</p>		
	</div>     
	<div class="review-legend">
		<h2>Review Legend</h2>
		<ul>
			<li>love</li>
			<li>sad</li>
			<li>funny</li>
			<li>thought provoking</li>
			<li>meh</li>
		</ul>                  
	</div>
			
  </div>
</template>

<script>

import {showList} from "../data/shows";

export default {
  name: 'Hero',
    data: function () {
    return {
      shows: showList
    }
  },
  computed:{
    musicalsCounter:function(){
      var result = showList.reduce((res, item) => item.type == 'musical' ? res + 1 : res, 0);
      return result;
    }, 
    playsCounter:function(){
      var result = showList.reduce((res, item) => item.type == 'play' ? res + 1 : res, 0);
      return result;
    },  
    upcomingCounter:function(){
      var result = showList.reduce((res, item) => item.upcoming ? res + item.upcoming : res, 0);
      return result;
    }
  }
}
</script>

<style>
  .statistics {
    background-color: white;
    padding: 30px;
  }
  .stats p {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    margin-right: 10px;
  }
  .review-legend li {
    border: 1px solid black;
    padding: 5px;
    margin-right: 5px;
  }
</style>