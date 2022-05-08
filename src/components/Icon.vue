<template>
	<svg>
		<use :xlink:href="`#${name}`" />
	</svg>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator';

	// let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
	let importAll = (requireContext: any) => requireContext.keys().forEach(requireContext);
	try {importAll(require.context('@/assets/icons', true, /\.svg$/));}
	catch(error) {console.log(error);}

	@Component
	export default class Icon extends Vue {
		@Prop() readonly name!: string;
	}
</script>

<style lang="scss" scoped>

</style>