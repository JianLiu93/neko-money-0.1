<template>
	<wrapper :style="{height:h+'px'}">
		<div class="top statistics">
		<Types class-prefix="type" type="-" @update:type="updateType"/>
		<Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
		<div class="chart-wrapper" ref="chartWrapper">
			<Chart class="chart" ref="charts" :options="dataMap" style="width:420%" @onScroll="scrollChart" />
		</div>
		</div>
		<div class="data-list">
		<ul class="group-list">
			<li v-if="groupList.length === 0">
				<div class="none">目前没有记录</div>
			</li>
			<li v-for="(group, index) in groupList" :key="index">
				<h3 class="title" v-if="interval==='day'"><i>{{dayTitle(group.title)}}</i>    <i class="total">￥{{group.total}}</i></h3>
				<h3 class="title" v-if="interval==='month'"><i>{{monthTitle(group.title)}}</i><i class="total">￥{{group.total}}</i></h3>
				<h3 class="title" v-if="interval==='year'"><i>{{group.title}}</i>             <i class="total">￥{{group.total}}</i></h3>
				<ul v-if="interval!=='year'">
					<li class="record" v-for="item in group.items" :key="item.id">
						<span>{{tagString(item.tag)}}</span>
						<span class="notes">{{item.note}}</span>
						<span>￥{{item.sum}}</span>
					</li>
				</ul>
			</li>
		</ul>
		</div>
	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import dayjs, { OpUnitType } from 'dayjs'
	import { Component, Watch } from 'vue-property-decorator'
	import Types from '@/components/Types.vue';
	import Tabs from '@/components/Tabs.vue';
	import intervalList from '@/constants/intervalList';
	import Chart from '@/components/Chart.vue';
	import { EChartsOption } from 'echarts';
	import _ from 'lodash';

	type result = {title: string, items: RecordData[], total: number}[];
	type chartData = {date: string, value: number}

	function clone<T>(data: T): T {
		return JSON.parse(JSON.stringify(data));
	}

	function groupResult(newList: RecordData[], interval: OpUnitType): result {
		if(newList.length === 0) return [];
		let result: result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]], total: 0}];
		for(let i=1; i<newList.length; i++) {
			const current = newList[i];
			const last = result[result.length - 1];
			if( dayjs(last.title).isSame(dayjs(current.createdAt), interval) ) {
				last.items.push(current);
			} else {
				result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current], total: 0});
			}
		}
		result.forEach(group => {
			group.total = group.items.reduce((sum, item) => sum + item.sum, 0) || 0;
		});
		result.sort((a, b) => dayjs(b.title).valueOf() - dayjs(a.title).valueOf());
		if(interval !== 'year') {return result;}
		else {
			const record = result[0].items;
			let tagSort: result = [{title: record[0].tag, items: [record[0]], total: 0}];
			for(let i=1; i<record.length; i++) {
				const current = record[i];
				const found = tagSort.find((i) => i.title === current.tag);
				if(found) {
					found.items.push(current);
				} else {
					tagSort.push({title: current.tag, items: [current], total: 0});
				}
			}
			tagSort.forEach(group => {
				group.total = group.items.reduce((sum, item) => sum + item.sum, 0) || 0;
			});
			return tagSort;
		}
	}


	@Component({
		components: { Types, Tabs, Chart },
	})
	export default class Statistics extends Vue {
		h = document.documentElement.clientHeight;
		
		type = '-';
		interval = 'day' as OpUnitType;
		intervalList = intervalList;

		// computed
		get recordList(): RecordData[] {
			return this.$store.state.recordList;
		}
		get groupList(): result {
			const {recordList} = this;
			if(recordList.length === 0 || !recordList) {return [];}
			const copyRecord = clone(recordList);
			const newList = copyRecord.filter(r => r.type === this.type)
			.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());

			return groupResult(newList, this.interval);
			// type HashTableValue = { title: string, items: RecordData[] };
			// const hashTable: { title: string, items: RecordData[] }[];
			// const hashTable: { [key: string]: HashTableValue } = {};
			// for(let i=0; i<recordList.length; i++) {
			// 	console.log(recordList[i].createdAt);
			// 	const [date, time] = recordList[i].createdAt!.split('T');
			// 	hashTable[date] = hashTable[date] || {title: date, items:[]};
			// 	hashTable[date].items.push(recordList[i]);
			// }
		}

		get chartArray(): chartData[] {
			const today = new Date();
			const array = [];
			if(this.interval === 'day') {
				for(let i=0; i<=29; i++) {
					const dateStr = dayjs(today)
					.subtract(i, 'day').format('YYYY-MM-DD');
					const found = _.find(this.groupList, {
						title: dateStr
					});
					array.push({
						date: dateStr, value: (found ? found.total: 0) || 0
					});
				}
			} else if(this.interval === 'month') {
				for(let i=0; i<=11; i++) {
					const dateStr = dayjs(today)
					.subtract(i, 'month').format('YYYY-MM');
					const found = this.groupList.find((i) => i.title.match(dateStr));
					array.push({
						date: dateStr, value: (found ? found.total: 0) || 0
					});
				}
			} else {
				for(let r of this.groupList) {
					array.push({
						date: r.title, value: r.total
					});
				}
				return array;
			}
			array.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
			return array;
		}

		get dataMap(): unknown {
			const keys = this.chartArray.map(item => item.date);
			const values = this.chartArray.map(item => (item.value || 0).toString());
			const {interval} = this;

			const optionTime = {
			grid: {
				left: 0,
				right: 0,
				top: 60,
				bottom: 10,
				containLabel: true
			},

			xAxis: {
			type: 'category',
			data: keys,
			boundaryGap: true,
			axisTick: { alignWithLabel: true },
			axisLine: { lineStyle: {color: 'red'} },
			axisLabel: {
				formatter: function(value: string): string {
					if(interval === 'day') {return value.substr(5);}
					if(interval === 'month') {return value.substr(5) + '月';}
					else {return value;}
				}
			}
			},
			yAxis: {
				type: 'value',
				show: false
			},
			series: [{
				data: values,
				type: 'line',
				smooth: true,
				itemStyle: { borderWidth: 1, color: 'white', borderColor: 'red' },
				lineStyle: { color: 'red', },
				symbol: 'circle',
				symbolSize: 10,
				
			}],
			tooltip: {
				show: true, triggerOn: 'click',
				formatter: '￥{c}',
				position: 'top',
			},
			};

			const chartSort = this.chartArray.map(item => {
				return {name: item.date, value: item.value}
			});

			const optionSort = {
				title: {
					text: '年度统计',
					left: 'center',
				},
				tooltip: {
					trigger: 'item'
				},
				series: [
					{
						// name: '花费',
						label: {
							position: 'outside',
							formatter: '{b}' // 设置标签格式
						},
						type: 'pie',
						radius: ['40%', '70%'],
						center: ['50%', '55%'],
						clockwise: true,
						data: [...chartSort],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						tooltip: {
							show: true, triggerOn: 'click',
							formatter: '￥{c}, {d}%',
							position: 'top',
						},
					}
				]
		};
			if(interval === 'year') {return optionSort;}
			else {return optionTime;}
		}
		// computed

		// 生命周期钩子
		beforeCreate(): void {
			this.$store.commit('fetchRecords');
		}

		mounted(): void {
			const div = this.$refs.chartWrapper as HTMLDivElement;
			div.scrollLeft = div.scrollWidth;
			(this.$refs.charts as any).resizeChart();
			// const chart= document.querySelector('.chart') as HTMLDivElement;
			// const width = window.getComputedStyle(chart).width.slice(0, -2);
		}
		// 组件内定义路由导航守卫
		// beforeRouteEnter(to: Route, from: Route, next: any): void {
		// 	console.log('before route update');
		// 	if(to.query.id) {
		// 		this.interval = to.query.id as OpUnitType;
		// 	}
		// 	next();
		// }
		// 生命周期钩子

		// 绑定事件
		updateType(value: string): void {
			this.type = value;
		}
		tagString(tag: string): string {
			return tag.length === 0 ? 'none' : tag;
		}

		dayTitle(string: string): string {
			const day = dayjs(string);
			const now = dayjs();
			if(day.isSame(now, 'date')) {
				return '今天';
			} else if(day.isSame(now.subtract(1,'day'), 'date')) {
				return '昨天';
			} else if(day.isSame(now.subtract(2,'day'), 'date')) {
				return '前天';
			} else if(day.isSame(now, 'year')) {
				return day.format('M月D日');
			} else {
				return day.format('YYYY年M月D日');
			}
		}
		monthTitle(string: string): string {
			const day = dayjs(string);
			const now = dayjs();
			if(day.isSame(now, 'month')) {
				return '本月';
			} else if(day.isSame(now.subtract(1,'month'), 'month')) {
				return '上月';
			} else if(day.isSame(now, 'year')) {
				return day.format('M月');
			} else {
				return day.format('YYYY年M月');
			}
		}
		scrollChart(): void {
			const div = this.$refs.chartWrapper as HTMLDivElement;
			div.scrollLeft = div.scrollWidth;
		}
		// 绑定事件

		// watchers
		@Watch('interval')
		onIntervalChange(): void {
			const chart= document.querySelector('.chart') as HTMLDivElement;
			let chartWidth = '';
			if(this.interval === 'day') {chartWidth = '420%'}
			else if(this.interval === 'month') {chartWidth = '200%'}
			else {chartWidth = '100%'}
			chart.style.width = chartWidth;
			(this.$refs.charts as any).resizeChart();
		}
		@Watch('$route.query', {immediate: true})
		routeWatch(): void {
			if(this.$route.query.type === '+') {
				this.type = '+';
			}
			if(this.$route.query.id) {
				this.interval = this.$route.query.id as OpUnitType;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top ::v-deep {
		.tabs {
		.interval-item {
			height: 40px;
			background: #ffeab9;
			// #d6e7aa
			&.selected {
				background: #fdab90;
				&::after {
					height: 2px;
				}
			}
		}
		}
	}
	.chart-wrapper {
      height: 280px;
      background: #fff;
      &::v-deep .chart {
		width: 420%;
        height: 270px;
      }
    }
	%item {
		padding: 8px 16px;
		line-height: 24px;
		min-height: 40px;
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
	.title {
		background: #ffeab9;
		@extend %item;
	}
	.record {
		background: #fff;
		@extend %item;
	}
	.notes {
		margin-right: auto;
		margin-left: 8px;
		color: #aaa;
	}
	.none {
		margin-top: 20px;
	}
	@mixin scroll {
		&::-webkit-scrollbar {
		width: 6px;
		height: 10px;
		}
		&::-webkit-scrollbar-thumb {
		// 滚动条里面小方块
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #ccc;
		}
	}
	.chart {
		&-wrapper {
			overflow-x: auto;
			@include scroll();
		}
		@media (max-width: 500px) {
		&-wrapper::-webkit-scrollbar {display: none;}
		}
	}
	.data-list {
		min-height: 230px;
		overflow: auto;
		flex-grow: 1;
		i {
			font-style: normal;
			&.total {
			font-style: italic;
			color: #666;
			}
		}
		
		@include scroll();
		@media (max-width: 500px) {
			&::-webkit-scrollbar {display: none;}
		}
	}
</style>