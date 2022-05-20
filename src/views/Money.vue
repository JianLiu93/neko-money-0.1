<template>
  <div>
    <wrapper :style="{height:h+'px'}">
	<Tags :data-tags="tags" @update:tag="onUpdateTag" />
	<Notes class="note-bar" @update:value="onUpdateNote"
	field-name="备注" placeholder="请在这里输入简要备注"/>
	<DateBar class="date-bar" :value.sync="record.createdAt"
	type="date"
	field-name="日期" placeholder="请在这里输入日期"/>
	<Types type="-" @update:type="onUpdateType" />
	<Calculator @update:sum="onUpdateSum" @submit="saveRecord"/>
	{{recordList}}
    </wrapper>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator'
	import Tags from '@/components/Tags.vue'
	import Notes from '@/components/Notes.vue'
	import Types from '@/components/Types.vue'
	import Calculator from '@/components/Calculator.vue'
	import DateBar from '@/components/DateBar.vue';

	
	@Component({
		components: { Tags, Notes, DateBar, Types, Calculator },
	})
	export default class Money extends Vue {

		h = document.documentElement.clientHeight;
		
		get tags(): Tag[] | null {
			return this.$store.state.tagList;
		}

		record: RecordData = {
			tag:'', note:'', type: '-', sum: 0, createdAt: new Date().toISOString(),
		}
		recordList: RecordData[] = this.$store.state.recordList;

		beforeCreate(): void {
			this.$store.commit('fetchRecords');
			this.$store.commit('fetchTags');
		}
		onUpdateTag (tag: string): void {
			this.record.tag = tag;
		}
		onUpdateNote (note: string): void {
			this.record.note = note;
		}
		onUpdateDate (date: string): void {
			this.record.createdAt = date;
		}
		onUpdateType (type: string): void {
			this.record.type = type;
		}
		onUpdateSum (value: string): void {
			this.record.sum = parseFloat(value);
		}
		saveRecord(): void {
			if(!this.record.tag || !this.record.note || !this.record.createdAt) {
				window.alert('请输入完整信息！');
				return;
			} else {
				this.$store.commit('createRecords',this.record);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>