<template>
  <div class="statistics">
    <div class="statistics-content">
      <h1>TheaterLog</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur.</p>
      <!-- <p>My earliest musical theater memory is from 5th grade. My parents had bought me a VHS copy of Grease that I carried around in my backpack, forcing friends to watch it with me after school. Since then, I have had a special love for plays and musicals. I created TheaterLog to keep track of which shows I have seen since 2010, when I first started watching shows on my own.</p>    -->
      <div class="stats">
        <h2>Statistics</h2>
        <p class="counter">Total Shows Seen: {{ shows.length + 26}}</p>
        <p class="counter">Upcoming: {{ upcomingCounter }}</p>
        <p class="counter">Musicals: {{ musicalsCounter + 26}}</p>
        <p class="counter">Plays: {{ playsCounter}}</p>   
      </div>    
    </div>
    <div class="window">
      <div class="review-legend">
        <h2>Review Legend</h2>
        <ul>
          <li>
            <img alt="Vue logo" src="./../assets/love.svg">
            <p>love</p>
          </li>
          <li>
            <img alt="Vue logo" src="./../assets/happy.svg">
            <p>like</p>
          </li>
          <li>
            <img alt="Vue logo" src="./../assets/funny.svg">
            <p>funny</p>
          </li>
          <li>
            <img alt="Vue logo" src="./../assets/happy-sad.svg">
            <p>sad but happy</p>
          </li>
          <li>
            <img alt="Vue logo" src="./../assets/thought-provoking.svg">
            <p>thought provoking</p>
          </li>
          <li>
            <img alt="Vue logo" src="./../assets/sad.svg">
            <p>sad</p>
          </li> 
          <li>
            <img alt="Vue logo" src="./../assets/confused.svg">
            <p>confused</p>
          </li>
          <li>
            <img alt="Vue logo" src="./../assets/meh.svg">
            <p>meh</p>
          </li> 
          <li>
            <img alt="Vue logo" src="./../assets/dislike.svg">
            <p>dislike</p>
          </li>                               
        </ul>                  
      </div> 
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
    border: 10px solid white;
    display: grid;
    grid-template-columns: 1.5fr .5fr;
    grid-auto-rows: auto;
    text-align: left;
  }


  h1 {
    font-family: 'Amaranth', sans-serif;
  } 

  h2 {
    margin-top: 0;
  }

  p {
    margin-bottom: 20px;
  }

  .stats .counter {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .review-legend ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .review-legend li {
    padding: 5px;
    margin-right: 5px;
    display: inline-block;
    text-align: center;
  }
  .review-legend p {
    font-size: 11px;
  }
  .review-legend img {
      height: 30px;
  }
</style>