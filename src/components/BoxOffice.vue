<template>
  <div class="box-office-container">
	<div>Social Media?</div>
	<img src="" alt="box office image">
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
		color: white;
	}

</style>