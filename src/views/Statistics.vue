<template>
	<wrapper>
		<div class="top statistics">
		<Types class-prefix="type" type="-" @update:type="updateType"/>
		<Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
		</div>
		<ul>
			<li v-for="(group, index) in groupList" :key="index">
				<h3 class="title">{{beautify(group.title)}}</h3>
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
	import dayjs from 'dayjs'
	import { Component } from 'vue-property-decorator'
	import Types from '@/components/Types.vue';
	import Tabs from '@/components/Tabs.vue';
	import intervalList from '@/constants/intervalList';

	type HashTableValue = { title: string, items: RecordData[] };

	function clone<T>(data: T): T {
		return JSON.parse(JSON.stringify(data));
	}

	@Component({
		components: { Types, Tabs },
	})
	export default class Statistics extends Vue {
		type = '-';
		interval = 'day';
		intervalList = intervalList;
		
		get recordList(): RecordData[] {
			return this.$store.state.recordList;
		}
		get groupList(): HashTableValue[] {
			const {recordList} = this;
			if(recordList.length === 0) {return [];}
			const copyRecord = clone(recordList);
			const newList = copyRecord.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());
			const result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
			for(let i=1; i<newList.length; i++) {
				const current = newList[i];
				const last = result[result.length - 1];
				if( dayjs(last.title).isSame(dayjs(current.createdAt), 'day') ) {
					last.items.push(current);
				} else {
					result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
				}
			}
			console.log(result);
			return result;
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

		beautify(string: string): string {
			const day = dayjs(string);
			const now = dayjs();
			if(day.isSame(now, 'day')) {
				return '今天';
			} else if(day.isSame(now.subtract(1,'day'), 'day')) {
				return '昨天';
			} else if(day.isSame(now.subtract(2,'day'), 'day')) {
				return '前天';
			} else if(day.isSame(now, 'year')) {
				return day.format('M月D日');
			} else {
				return day.format('YYYY年M月D日');
			}
		}
	}
</script>

<style  lang="scss" scoped>
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