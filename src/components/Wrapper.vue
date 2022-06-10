<template>
	<div class="wrapper">
		<section class="content">
			<slot></slot>
		</section>
		<Nav />
	</div>
</template>

<script lang="ts">
	export default {
		name: 'Wrapper',
	}
</script>

<style lang="scss" scoped>
.wrapper::-webkit-scrollbar{
	display: none;;
}
.content {
	display: flex;
	flex-direction: column;
	overflow: auto;
	&::-webkit-scrollbar{
	display: none;
	}
}
</style>