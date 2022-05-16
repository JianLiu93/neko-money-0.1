<template>
	<wrapper :style="{height:h+'px'}">
		<div class="top statistics">
		<Types class-prefix="type" type="-" @update:type="updateType"/>
		<Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
		</div>
		<ul>
			<li v-if="groupList.length === 0"><h3>没有数据</h3></li>
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

	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import dayjs, { OpUnitType } from 'dayjs'
	import { Component } from 'vue-property-decorator'
	import Types from '@/components/Types.vue';
	import Tabs from '@/components/Tabs.vue';
	import intervalList from '@/constants/intervalList';

	type result = {title: string, items: RecordData[], total?: number}[];

	function clone<T>(data: T): T {
		return JSON.parse(JSON.stringify(data));
	}

	function groupResult(newList: RecordData[], interval: OpUnitType): result {
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
		components: { Types, Tabs },
	})
	export default class Statistics extends Vue {
		h = document.documentElement.clientHeight;
		
		type = '-';
		interval= 'day' as OpUnitType;
		intervalList = intervalList;

		get recordList(): RecordData[] {
			return this.$store.state.recordList;
		}
		get groupList(): result {
			const {recordList} = this;
			if(recordList.length === 0) {return [];}
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
		.type-item {
		background: #fff;
		&.selected {
			background: #c4c4c4;
			&::after {
				display: none;
			}
		}
		}
		.tabs {
		margin-top: 20px;
		.interval-item {
		background: #fff;
		&.selected {
			background: #c4c4c4;
		}
		}
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
		background: #eee;
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
</style>