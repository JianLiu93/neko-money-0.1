<template>
	<div class="wrapper">
		<div class="content">
			<slot></slot>
		</div>
		<Nav />
	</div>
</template>

<script lang="ts">
	export default {
		name: 'Wrapper',
	}
</script>

<style lang="scss" scoped>

</style>