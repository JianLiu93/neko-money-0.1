<template>
	<div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop, Watch } from 'vue-property-decorator';
	// import echarts, { EChartsOption } from 'echarts';
	import * as echarts from 'echarts';
	type EChartsOption = echarts.EChartsOption;



	@Component
	export default class Chart extends Vue {
		@Prop() options?: EChartsOption;
		@Prop() resize!: string;
		chart?: echarts.ECharts;

		mounted(): void {
			if(!this.options) {
				return console.error('options 为空');
			}
			this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
			this.chart.setOption(this.options);	
		}

		@Watch('options', {immediate: true})
		onOptionsChange(newVal: EChartsOption): void {
			if(this.chart) {
				this.chart.clear();
				this.chart.setOption(newVal);
			}
		}
		resizeChart(): void {
			if(this.chart) {
				this.chart.resize();
				this.$emit('onScroll', 1);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>