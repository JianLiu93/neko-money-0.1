<template>
  <div>
    <wrapper>
	<Tags :data-tags.sync="tags" @update:tag="onUpdateTag" />
	<Notes @update:note="onUpdateNote" />
	<Types @update:type="onUpdateType" />
	<Calculator @update:sum="onUpdateSum" @submit="saveRecord"/>
	{{recordList}}
    </wrapper>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop, Watch } from 'vue-property-decorator'
	import Tags from '@/components/Tags.vue'
	import Notes from '@/components/Notes.vue'
	import Types from '@/components/Types.vue'
	import Calculator from '@/components/Calculator.vue'

	type Record = {
		tag: string
		note: string
		type: string
		sum: number
		createdAt?: Date  //类
	}
	const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

	@Component({
		components: { Tags, Notes, Types, Calculator },
	})
	export default class Money extends Vue {
		tags = ['美食', '住宿', '出行', '娱乐'];

		record: Record = {
			tag:'', note:'', type: '-', sum: 0
		}
		recordList: Record[] = recordList;

		onUpdateTag (tag: string): void {
			this.record.tag = tag;
		}
		onUpdateNote (note: string): void {
			this.record.note = note;
		}
		onUpdateType (type: string): void {
			this.record.type = type;
		}
		onUpdateSum (value: string): void {
			this.record.sum = parseFloat(value);
		}
		saveRecord(): void {
			let copyRecord: Record = JSON.parse(JSON.stringify(this.record));
			copyRecord.createdAt = new Date();
			this.recordList.push(copyRecord);
		}

		@Watch('recordList')
		onRecordListChange(): void {
			window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
		}
	}
</script>

<style lang="scss" scoped>

</style>