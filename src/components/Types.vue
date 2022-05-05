<template>
	<div>
		<ul class="types">
			<li :class="type === '-' && 'selected'"
			@click="selectType('-')">支出</li>
			<li :class="type === '+' && 'selected'"
			@click="selectType('+')">收入</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop, Watch } from 'vue-property-decorator'

	@Component
	export default class Types extends Vue {
		type = '-';

		selectType(type: string) :void {
			if((type !== '-') && (type !== '+')) {
				throw new Error('wrong type');
			}
			this.type = type;
		}

		@Watch('type')
		onTypeChanged(value: string): void {
			this.$emit('update:type', value);
		}
		
	}
</script>

<style lang="scss" scoped>
.types {
	li.selected {
			background: #eee;
		}
}
</style>