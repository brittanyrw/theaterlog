<template>
	<div class="shows">
		<div class="row" v-for="i in rowCount" v-bind:key="i">
			<div v-for="(show) in itemCountInRow(i)" v-bind:key="show.id" class="show" v-bind:class="[{ upcoming: show.upcoming }] ">
				<div v-if="show.upcoming == false && (show.fav || show.review || show.multi)" class="show-opinion">
					<div v-if="show.fav" class="fav-view"><font-awesome-icon icon="star" class="fav-icon" /></div>
					<div v-if="show.review" class="review">

						<img v-if="show.review == 'happy-sad'" alt="crying but happy emoji" src="./../assets/happy-sad.svg">
						<img v-if="show.review == 'sad'" alt="sad" src="./../assets/sad.svg">
						<img v-if="show.review == 'confused'" alt="confused" src="./../assets/confused.svg">
						<img v-if="show.review == 'funny'" alt="funny" src="./../assets/funny.svg">
						<img v-if="show.review == 'love'" alt="love" src="./../assets/love.svg">
						<img v-if="show.review == 'meh'" alt="meh" src="./../assets/meh.svg">
						<img v-if="show.review == 'thought-provoking'" alt="thought-provoking" src="./../assets/thought-provoking.svg">
						<img v-if="show.review == 'dislike'" alt="dislike" src="./../assets/dislike.svg">
						<img v-if="show.review == 'happy'" alt="happy" src="./../assets/happy.svg">

					</div>
					<div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
				</div>
				<div class="show-info">
					<p class="type">{{show.type}}</p>
					<p class="show-name">{{ show.name }}</p>
					<p class="show-theater">{{ show.theater }}</p>
					<p class="show-location">{{ show.location }}</p>
					<p class="show-date">{{ show.date }}</p>					
				</div>
				<div v-if="show.favSong" class="favs">
					<p class="fav-song-label">Fav Song</p>
					<div class="fav-song">
						<p class="song-label">
						<font-awesome-icon icon="music" class="fs-icon" /></p>
						<p class="song-name">{{ show.favSong }}</p>
					</div> 
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import {showList} from "../data/shows";

export default {
	name: 'Shows',
	data: function () {
		return {
			shows: showList,
			rowLength: 3
		}
	},computed:{
		rowCount:function(){     
			return Math.ceil(this.shows.length / this.rowLength);
		}
	},
	methods:{
		itemCountInRow:function(index){
			return this.shows.slice((index - 1) * this.rowLength, index * this.rowLength)
		}
	}
}
</script>
<style>
	.row {
		background-color: #EDECFA;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: auto;
		grid-gap: 40px;
		padding: 40px;
		min-height: 400px;
		border: 10px solid #6661af;
		position: relative;
	}
	.row:after {
		position: absolute;
		content: '';
		height: 23px;
		width: 105%;
		left: -2.5%;
		top: -5.5%;
		background-color: #6661af;
	}
	.show {
		padding: 20px 25px;
		background-color: white;
		position: relative;
		border: 2px solid #402e47;
		box-shadow: 3px 3px 0 #9994E1, 6px 6px 0 #3128BB;
		/*box-shadow: -4px 4px 0 pink, -8px 8px 0 #4579f5, -12px 12px 0 gold;*/
	}

	.show.upcoming {
		box-shadow: gray;
		border: 1px solid dimgray;
		color: gray;
		box-shadow: 5px 5px 0 dimgray;
	}

	.show-name {
		font-family: 'Amaranth', sans-serif;
		font-size: 24px;
		
	}

	.show-theater, .show-location, .show-date {
		font-size: 18px;
	}

	.show-opinion {
		position: absolute;
		left: -25px;
		width: 45px;
	}

	.type {
		font-size: 16px;
		position: absolute;
		right: -15px;
		background: #7ed6c9;
		margin: 0;
		padding: 5px;
		top: -14px;
		transform: rotate(3deg);
		border: 2px solid #402e47;
		color: #402e47;
		font-weight: bold;
	}

	.show-opinion div {
		height: 50px;
		color: #402e47;
	}

	.show-opinion .review {
		background-color: lightpink;
		border-radius: 50%;
		margin-bottom: 15px;
		/*border: 1px solid #402e47;*/
		font-size: 15px;
		width: 50px;
	}

	.show-opinion .review img {
		width: 100%;
	}

	.show-opinion .fav-view .fav-icon {
		color: gold;
		font-size: 39px;
		margin-bottom: 8px;
	}

	.show-opinion .multi-view {
		background-color: #908ae2;
		color: white;
		height: 30px;
		padding: 10px;
		font-weight: bold;
		height: 47px;
		border: 2px solid #402e47;
	}

	.favs {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white;
		padding: 0 20px;
		font-size: 16px;
		color: #402e47;
		border-top: 2px solid #402e47;
	}

	.fav-song-label {
		position: absolute;
		top: -30px;
		background-color: gold;
		font-weight: bold;
		padding: 3px 5px;
		left: 10px;
		font-size: 14px;
		border: 2px solid #402e47;
		transform: rotate(-2deg);
	}

	.show.upcoming .type {
		border: 2px solid dimgray;
		background-color: lightgray;
		color: dimgray;
	}

	.fav-view path {
		stroke: #402e47;
		stroke-width: 25;
	}

	.song-label, .song-name {
		display: inline-block;
	}
	.song-label {
		margin-right: 5px;
	}

	@media screen and (max-width: 667px){
		.row {
			grid-template-columns: 1fr;
		}
	}

</style>