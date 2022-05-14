<template>
	<div>
		<ul class="tabs">
			<li v-for="item in dataSource" :key="item.value"
			:class="{selected: item.value === value, 
			[classPrefix + '-item']: classPrefix}" 
			@click="select(item)">{{item.text}}</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator'

	type DataSourceItem = {text: string, value: string}

	@Component
	export default class Tabs extends Vue {
		@Prop({required: true}) dataSource!: DataSourceItem[];
		@Prop(String) readonly value !: string;
		@Prop(String) readonly classPrefix?: string;

		select(item: DataSourceItem) :void {
			this.$emit('update:value', item.value);
		}
		
	}
</script>

<style lang="scss" scoped>
.tabs {
	li.selected {
			background: #eee;
		}
}
</style>