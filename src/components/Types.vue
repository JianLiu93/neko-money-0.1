<template>
	<div>
		<ul class="types">
			<li :class="type === '-' && 'selected'"
			@click="selectType('-')">支出</li>
			<li :class="type === '+' && 'selected'"
			@click="selectTypes('+')">收入</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator';

	@Component
	export default class Types extends Vue {
		type = '-';

		selectType(type: string) :void {
			if((type !== '-') && (type !== '+')) {
				throw new Error('wrong type');
			}
			this.type = type;
		}
		
		@Prop(Number) num: number | undefined;
	}
</script>

<style lang="scss" scoped>

</style>