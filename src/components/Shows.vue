<template>
	<div class="shows">
		<div class="row" v-for="i in rowCount" v-bind:key="i">
			<div v-for="(show) in itemCountInRow(i)" v-bind:key="show.id" class="card" v-bind:class="[{ fav: show.fav, upcoming: show.upcoming }] ">
				<!-- <img v-bind:src="show.illustration"> -->
				<div class="show-info">
					<div v-if="show.review" class="review"><Review /></div>
					<div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
					<div v-if="show.fav" class="fav-view">favorite show</div>
				</div>
				<div class="show-illustration">{{ show.illustration }}</div>
				<p class="show-name">{{ show.name }}</p>
				<p class="show-theater">{{ show.theater }}</p>
				<p class="show-location">{{ show.location }}</p>
				<p class="show-date">{{ show.date }}</p>
				<div v-if="show.favSong" class="opinions">
					<div v-if="show.favSong" class="fav-song"><p class="song-label"><font-awesome-icon icon="music" /></p><p class="song-name">{{ show.favSong }}</p></div> 
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import {showList} from "../data/shows";
import Review from "./Review";

export default {
	name: 'Shows',
	components: { Review },
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