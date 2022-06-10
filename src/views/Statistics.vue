<template>
	<wrapper :style="{height:h+'px'}">
		<div class="top statistics">
		<Types class-prefix="type" type="-" @update:type="updateType"/>
		<Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
		<div class="chart-wrapper" ref="chartWrapper">
			<Chart class="chart" :options="dataMap" />
		</div>
		</div>
		<div class="data-list">
		<ul class="group-list">
			<li v-if="groupList.length === 0"><h3>目前没有记录</h3></li>
			<li v-for="(group, index) in groupList" :key="index">
				<h3 class="title" v-if="interval === 'day'">{{dayTitle(group.title)}}</h3>
				<h3 class="title" v-if="interval === 'month'">{{monthTitle(group.title)}}</h3>
				<h3 class="title" v-if="interval === 'year'">{{yearTitle(group.title)}}</h3>
				<ul>
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
	import { Component } from 'vue-property-decorator'
	import Types from '@/components/Types.vue';
	import Tabs from '@/components/Tabs.vue';
	import intervalList from '@/constants/intervalList';
	import Chart from '@/components/Chart.vue';
	import { EChartsOption } from 'echarts';
	import _ from 'lodash';

	type result = {title: string, items: RecordData[], total?: number}[];

	function clone<T>(data: T): T {
		return JSON.parse(JSON.stringify(data));
	}

	function groupResult(newList: RecordData[], interval: OpUnitType): result {
		if(newList.length === 0) {return [];}
		const result: result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
		for(let i=1; i<newList.length; i++) {
			const current = newList[i];
			const last = result[result.length - 1];
			if( dayjs(last.title).isSame(dayjs(current.createdAt), interval) ) {
				last.items.push(current);
			} else {
				result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
			}
		}
		result.forEach(group => {
			group.total = group.items.reduce((sum, item) => sum + item.sum, 0);
		});
		return result;
	}


	@Component({
		components: { Types, Tabs, Chart },
	})
	export default class Statistics extends Vue {
		h = document.documentElement.clientHeight;
		
		type = '-';
		interval = 'day' as OpUnitType;
		intervalList = intervalList;

		get chartArray() {
			const today = new Date();
			const array = [];
			for(let i=0; i<=29; i++) {
				const dateStr = dayjs(today)
				.subtract(i, 'day').format('YYYY-MM-DD');
				const found = _.find(this.groupList, {
					title: dateStr
				});
				array.push({
					date: dateStr, value: found ? found.total: 0
				});
			}
			array.sort((a, b) => {
				if(a.date > b.date) {
					return 1;
				} else if(a.date === b.date) {
					return 0;
				} else {
					return -1;
				}
			});
			return array;
		}

		get dataMap(): EChartsOption {
			const keys = this.chartArray.map(item => item.date);
			const values = this.chartArray.map(item => (item.value || 0).toString());
			console.log('values', values);

			return {
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
			axisTick: { alignWithLabel: true },
			axisLine: { lineStyle: {color: 'red'} },
			axisLabel: {
				formatter: function (value:string) {
					return value.substr(5);
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
				formatter: '{c}',
				position: 'top',
			},
			};
		}

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

		beforeCreate(): void {
			this.$store.commit('fetchRecords');
		}

		mounted(): void {
			const div = this.$refs.chartWrapper as HTMLDivElement;
			div.scrollLeft = div.scrollWidth;
		}


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
		yearTitle(string: string): string {
			const day = dayjs(string);
			const now = dayjs();
			if(day.isSame(now, 'year')) {
				return '本年';
			} else if(day.isSame(now.subtract(1,'month'), 'month')) {
				return '去年';
			} else {
				return day.format('YYYY年');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top ::v-deep {
		.tabs {
		margin-top: 2px;
		.interval-item {
			height: 40px;
			background: #fff;
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
      &::v-deep .wrapper {
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
	@mixin scroll {
		&::-webkit-scrollbar {
		width: 10px;
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
		width: 420%;
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
		.group-list {
			@include scroll();
			@media (max-width: 500px) {
				&::-webkit-scrollbar {display: none;}
			}
		}
	}
</style>