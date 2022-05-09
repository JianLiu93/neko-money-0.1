<template>
	<button class="button" @click="$emit('click', $event)">
		<slot />
	</button>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator';

	@Component
	export default class AddButton extends Vue {
		
	}
</script>

<style lang="scss" scoped>
	
</style>