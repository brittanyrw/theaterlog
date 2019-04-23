<template>
	<div class="shows">
		<div class="row" v-for="i in rowCount" v-bind:key="i">
			<div v-for="(show) in itemCountInRow(i)" v-bind:key="show.id" class="show" v-bind:class="[{ upcoming: show.upcoming }] ">
				<div v-if="show.upcoming == false && (show.fav || show.review || show.multi)" class="show-opinion">
					<div v-if="show.fav" class="fav-view">fav</div>
					<div v-if="show.review" class="review">{{ show.review }}</div>
					<div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
				</div>
				<div class="show-info">
					<p class="show-name">{{ show.name }}</p>
					<p class="show-theater">{{ show.theater }}</p>
					<p class="show-location">{{ show.location }}</p>
					<p class="show-date">{{ show.date }}</p>					
				</div>
				<div v-if="show.favSong" class="favs">
					<div v-if="show.favSong" class="fav-song">
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
		background-color: lightgray;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: auto;
		grid-gap: 40px;
		padding: 40px;
		min-height: 400px;
		border: 10px solid gray;
	}
	.show {
		padding: 20px 25px;
		background-color: white;
		position: relative;
		border: 1px solid black;
	}

	.show-name {
		font-family: 'Amaranth', sans-serif;
	}

	.show-opinion {
		position: absolute;
		left: -25px;
		width: 45px;
	}

	.show-opinion div {
		margin-bottom: 10px;
		height: 50px;
		color: black;
	}

	.show-opinion .review {
		background-color: lightpink;
		border-radius: 50%;
	}

	.show-opinion .fav-view {
		background-color: gold;
		border-radius: 50%;
	}

	.show-opinion .multi-view {
		background-color: dimgray;
		color: white;
	}

	.favs {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: lavender;
		padding: 0 20px;
		font-size: 16px;
	}

	.fs-icon {
		float: left;
	}

	@media screen and (max-width: 667px){
		.row {
			grid-template-columns: 1fr;
		}
	}

</style>