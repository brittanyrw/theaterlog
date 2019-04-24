<template>
  <div class="box-office-container">
				
	<div class="posters">
		<div class="wall"></div>
	</div>
	<div class="doors">
		<div class="door"></div>
	</div>  
	<div class="box-office">
		<div class="window"></div>
	</div>
  </div>
</template>

<script>

export default {
  name: 'BoxOffice'
}
</script>
<style>
	.box-office-container {
		border: 10px solid #3128BB;
		background-color: #3128BB;
		display: grid;
		grid-template-columns: .5fr 1fr .5fr;
		min-height: 400px;
	}
	.posters {
		background-color: gray;
	}
	.doors {
		background: lightgray;
	}
	.box-office {
		background: dimgray;
	}
</style>