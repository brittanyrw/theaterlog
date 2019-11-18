<template>
	<div class="shows">
		<div class="row" v-for="i in rowCount" v-bind:key="i">
			<div v-for="(show) in itemCountInRow(i)" v-bind:key="show.id" class="show" v-bind:class="[{ upcoming: show.upcoming }] ">
				<div v-if="show.upcoming == false && (show.fav || show.review || show.multi)" class="show-opinion">
					<div v-if="show.fav" class="fav-view"><font-awesome-icon icon="star" class="fav-icon" /></div>
					<div v-if="show.review" class="review">
						<img v-bind:src="require('../assets/' + show.review + '.svg')" v-bind:alt="show.review + ' emoji'">
					</div>
					<div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
					<p v-if="show.price >= 0" class="show-price">${{ show.price }}</p>	
				</div>
				<div class="show-info">
					<p class="type">{{show.type}}</p>
					<div class="show-name">
						<p v-if="show.link"><a v-bind:href="show.link" target="_blank" :title="'Go to website for ' + show.name">{{ show.name }}</a></p>
						<p v-else>{{ show.name }}</p>
					</div>
					<p class="show-theater">{{ show.theater }}</p>
					<p class="show-location">{{ show.location }}</p>
					<p class="show-date">{{ show.date }}</p>				
				</div>
				<div v-if="show.favSong" class="favs">
					<p class="fav-song-label">Fav Song</p>
					<div class="fav-song">
						<p class="song-label">
						<font-awesome-icon icon="music" class="fs-icon" /></p>
						<p class="song-name"><a v-bind:href="show.favSongLink" target="_blank" :title="'View performance video for ' + show.favSong + ' from the musical ' + show.name">{{ show.favSong }}</a></p>
					</div> 
				</div>
			</div>
		</div>
		<div class="icon-attribute">Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan" target="_blank">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
		<div class="icon-attribute">Project created by <a href="https://musicalwebdev.com" title="Darius Dan" target="_blank">Brittany Walker</a></div>
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
		min-height: 410px;
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
		background-color: #504b8c;
	}
	.show {
		padding: 20px 25px;
		background-color: white;
		position: relative;
		border: 2px solid #402e47;
		box-shadow: 3px 3px 0 #9994E1, 6px 6px 0 #3128BB;
		transition: .5s;
	}

	.show.upcoming {
		box-shadow: gray;
		border: 1px solid dimgray;
		color: gray;
		box-shadow: 3px 3px 0 lightgray, 6px 6px 0 gray;
	}

	.show-name {
		font-family: 'Amaranth', sans-serif;
		font-size: 24px;
		border-bottom: 2px solid #402e47;
		
	}

	.show-name a {
		color: #402e47;
		text-decoration: none;
		transition: .5s;
	}

	.show-name a:hover {
		color: #3128BB;
		transition: .5s;
	}

	.show-theater, .show-location, .show-date {
		font-size: 18px;
	}

	.show-price {
		font-size: 14px;
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

	.show-opinion {
		position: absolute;
		left: -25px;
		width: 45px;
	}

	.show-opinion div {
		height: 50px;
		color: #402e47;
	}

	.show-opinion .review {
		background-color: lightpink;
		border-radius: 50%;
		margin-bottom: 15px;
		font-size: 15px;
		width: 50px;
		transition: .5s;
	}

	.show-opinion .review:hover {
		transform: rotate(-10deg);
		transition: .5s;
	}

	.show-opinion .review img {
		width: 100%;
	}

	.show-opinion .multi-view {
		background-color: #908ae2;
		height: 30px;
		padding: 10px;
		font-weight: bold;
		height: 47px;
		border: 2px solid #402e47;
		transition: .5s;
	}

	.show-opinion .multi-view:hover {
		transform: translateY(5px);
		transition: .5s;
	}

	.show-opinion .show-price {
		background-color: #7EC5D6;
		padding: 5px;
		font-weight: bold;
		border: 2px solid #402e47;
		-webkit-transition: .5s;
		transition: .5s;
		margin-top: 17px;
	}

	.show-opinion .show-price:hover {
		transform: translateY(-5px);
		transition: .5s;
	}

	.show-opinion .fav-view .fav-icon {
		color: gold;
		font-size: 39px;
		margin-bottom: 8px;
	}

	.show .fav-icon {
		transition: .5s;
	}

	.show .fav-icon:hover {
		transform: scale(1.2);
		transition: .5s;
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
	
	.song-name a {
		text-decoration: none;
		color: #402e47;
		transition: .5s;
	}

	.song-label {
		margin-right: 5px;
	}

	.fav-song .fs-icon {
		transition: .5s;
	}

	.fav-song:hover .fs-icon {
		transform: rotate(10deg);
		transition: .5s;
	}

	.fav-song a {
		transition: .5s;
	}

	.fav-song:hover a {
		font-weight: bold;
		transition: .5s;
	}

	@media screen and (max-width: 992px){
		.row {
			grid-template-columns: 1fr 1fr;
		}
		.row:after {
			top: -3%;
		}
		.favs {
			margin-top: 25px;
			position: relative;
		}
	}

	@media screen and (max-width: 667px){ 
		.row {
			grid-template-columns: 1fr;
		}
	}

	.icon-attribute {
		font-size: 15px;
		color: #402e47;
		margin-top: 15px;
	}

	.icon-attribute a {
		font-weight: bold;
		color: #402e47; 
	}

</style>
