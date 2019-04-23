<template>
	<div class="shows">
		<div class="row" v-for="i in rowCount" v-bind:key="i">
			<div v-for="(show) in itemCountInRow(i)" v-bind:key="show.id" class="show" v-bind:class="[{ upcoming: show.upcoming }] ">
				<div v-if="show.upcoming == false" class="show-opinion">
					<div v-if="show.fav" class="fav-view">{{ show.fav }}</div>
					<div v-if="show.review" class="review">REVIEW</div>
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
		grid-gap: 20px;
		padding: 40px;
		min-height: 400px;
		border: 10px solid gray;
	}
	.show {
		padding: 20px;
		background-color: white;
		position: relative;
		border: 1px solid black;
	}

	.favs {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: lavender;
		padding: 0 20px;
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