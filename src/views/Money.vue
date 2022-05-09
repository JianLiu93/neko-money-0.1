<template>
  <div>
    <wrapper>
	<Tags :data-tags.sync="tags" @update:tag="onUpdateTag" />
	<Notes class="noteBar" @update:value="onUpdateNote"
	field-name="备注" placeholder="请在这里输入简要备注"/>
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
	import { model } from '@/models/model'
	import { tagsModel } from '@/models/tagsModel'

	const recordList: RecordData[] =  model.fetch('recordList');
	
	@Component({
		components: { Tags, Notes, Types, Calculator },
	})
	export default class Money extends Vue {
		// tags = ['美食', '住宿', '出行', '衣妆', '娱乐'];
		tags = tagsModel.fetch();

		record: RecordData = {
			tag:'', note:'', type: '-', sum: 0
		}
		recordList: RecordData[] = recordList;

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
			if(!this.record.tag || !this.record.note) {
				window.alert('请输入完整信息！');
				return;
			}
			const copyRecord: RecordData = model.clone(this.record);
			copyRecord.createdAt = new Date();
			this.recordList.push(copyRecord);
		}

		@Watch('recordList')
		onRecordListChange(): void {
			model.save('recordList', this.recordList);
		}
	}
</script>

<style lang="scss" scoped>

</style>