<template>
	<wrapper>
		<div class="top statistics">
		<Types class-prefix="type" type="-" @update:type="updateType"/>
		<Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
		</div>
		<ul>
			<li v-for="(group, index) in result" :key="index">
				<h3 class="title">{{group.title}}</h3>
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
	import { Component } from 'vue-property-decorator'
	import Types from '@/components/Types.vue';
	import Tabs from '@/components/Tabs.vue';
	import intervalList from '@/constants/intervalList';

	type HashTableValue = { title: string, items: RecordData[] }

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
		get result(): { [key: string]: HashTableValue } {
			const {recordList} = this;
			const hashTable: { [key: string]: HashTableValue } = {};
			for(let i=0; i<recordList.length; i++) {
				console.log(recordList[i].createdAt);
				const [date, time] = recordList[i].createdAt!.split('T');
				hashTable[date] = hashTable[date] || {title: date, items:[]};
				hashTable[date].items.push(recordList[i]);
			}
			console.log(hashTable);
			return hashTable;
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

		beautify(string: string) {
			const day = new Date();
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