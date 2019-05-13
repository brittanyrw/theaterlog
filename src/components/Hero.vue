<template>
  <div>
    <h1>TheaterLog</h1>
    <div class="statistics">
      <div class="statistics-content">
        <p>Click on the show names to learn more about the show or current productions. And click on the song names to listen to my favorite songs from each show!</p>
        <div class="stats">
          <h2>Statistics</h2>
          <div class="counter total-stat"><p>Total Shows Seen</p> <p>{{ shows.length + 26}}</p></div>
          <div class="counter upcoming-stat"><p>Upcoming </p><p>{{ upcomingCounter }}</p></div>
          <div class="counter musical-stat"><p>Musicals</p> <p>{{ musicalsCounter + 26}}</p></div>
          <div class="counter play-stat"><p>Plays</p> <p>{{ playsCounter}}</p></div>   
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
    padding: 60px 30px 30px 30px;
    border: 10px solid #6661af;
    display: grid;
    grid-template-columns: 1.5fr .5fr;
    grid-auto-rows: auto;
    text-align: left;
  }


  h1 {
    font-family: 'Amaranth', sans-serif;
    padding: 12px 100px;
    display: inline-block;
    font-size: 60px;
    background-color: white;
    margin-bottom: -50px;
    color: #402e47;
    border: 8px solid #6661af;
    -webkit-box-shadow: 5px 5px 0 #9994E1, 8px 8px 0 #3128BB;
    box-shadow: 5px 5px 0 gold, 10px 10px 0 #3128BB;
    /* box-shadow: -4px 4px 0 pink, -8px 8px 0 #4579f5, -12px 12px 0 gold; */
  } 

  h2 {
    margin-top: 0;
  }

  p {
    margin-bottom: 20px;
  }

  .stats .counter {
    display: inline-block;
    border: 2px solid #402e47;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .stats .counter p {
    display: inline-block;
    margin: 0;
    padding: 10px;
    font-size: 18px;
  }

  .stats .counter p:last-child {
    border-left: 2px solid #402e47;
  }

  .stats .total-stat p:last-child {
    background-color: lightpink;
  }

  .stats .upcoming-stat p:last-child {
    background-color: gold;
  }

  .stats .musical-stat p:last-child {
    background-color: #7ed6c9;
  }

  .stats .play-stat p:last-child {
    background-color: #908ae2;
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

  @media screen and (max-width: 992px){ 
    .statistics, .review-ledgend ul {
      grid-template-columns: 1fr;
    }
    h1 {
      font-size: 40px;
      padding: 12px 50px;
    }
  }
</style>