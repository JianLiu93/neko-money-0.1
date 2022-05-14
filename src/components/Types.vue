<template>
	<div>
		<ul class="types">
			<li :class="{selected: myType === '-', 
			[classPrefix + '-item']: classPrefix}"
			@click="selectType('-')">支出</li>
			<li :class="{selected: myType === '+', 
			[classPrefix + '-item']: classPrefix}"
			@click="selectType('+')">收入</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop, Watch } from 'vue-property-decorator'

	@Component
	export default class Types extends Vue {
		@Prop(String) readonly type!: string;
		@Prop(String) readonly classPrefix?: string;

		myType = this.type;
		
		selectType(type: string) :void {
			if((type !== '-') && (type !== '+')) {
				throw new Error('wrong type');
			}
			this.myType = type;
		}

		@Watch('myType')
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