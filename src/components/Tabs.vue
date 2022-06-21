<template>
	<ul class="tabs">
		<li v-for="item in dataSource" :key="item.value"
		:class="{selected: item.value === value, 
		[classPrefix + '-item']: classPrefix}" 
		@click="select(item)">{{item.text}}</li>
	</ul>
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
    background: #fee101;
    display: flex;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    overflow-x: auto;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    caret-color: transparent;
    >li {
      cursor: pointer;
      flex: 1;
      width: 50%;
      min-width: 13.6%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #5b3611;
		border-radius: 2px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>