<template>
	<div class="shows">
		<div class="row" v-for="i in rowCount" v-bind:key="i">
			<div v-for="(show) in itemCountInRow(i)" v-bind:key="show.id" class="show" v-bind:class="[{ upcoming: show.upcoming }] ">
				<div v-if="show.upcoming == false" class="show-opinion">
					<div v-if="show.fav" class="fav-view">{{ show.fav }}</div>
					<div v-if="show.review" class="review">REVIEW</div>
					<div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
				</div>
				<!-- <div class="show-illustration">
					<img v-bind:src="show.illustration" v-bind:alt="show.imgName">
				</div> -->
				<div class="show-info">
					<p class="show-name">{{ show.name }}</p>
					<p class="show-theater">{{ show.theater }}</p>
					<p class="show-location">{{ show.location }}</p>
					<p class="show-date">{{ show.date }}</p>					
				</div>
				<div v-if="show.favSong" class="favs">
					<div v-if="show.favSong" class="fav-song">
						<p class="song-label">
						<font-awesome-icon icon="music" /></p>
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