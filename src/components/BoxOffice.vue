<template>
  <div class="box-office-container">
	<div class="posters">
		<div class="social-media">
			<ul>
				<li><a href="">Github</a></li>
				<li><a href="">Codepen</a></li>
				<li><a href="">Twitter</a></li>
				<li><a href="">Medium</a></li>											
			</ul>
		</div>
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
		border-bottom: 10px solid #6661af;
		border-left: 10px solid #6661af;
		border-right: 10px solid #6661af;
		background-color: #EDECFA;
		display: grid;
		grid-template-columns: .5fr 1fr .5fr;
		min-height: 400px;
		color: white;
	}

	.social-media {
		background-color: white;
		min-height: 300px;
		min-width: 250px;
		border: 5px solid #908ae2;
		padding: 10px;
		transform: rotate(-5deg);
	}

</style>