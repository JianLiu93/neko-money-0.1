<template>
  <div id="money">
    <wrapper :style="{height:h+'px'}">
	<Types class="header" type="-" @update:type="onUpdateType" />
	<Tags v-if="record.type === '-'" :data-tags="tags" @update:tag="onUpdateTag" />
	<Tags v-else :data-tags="tagsIn" :add="false" @update:tag="onUpdateTag" />
	<div class="page-bottom">
      <div class="notes">
      <Notes class="note-bar" @update:value="onUpdateNote"
      field-name="备注" placeholder="请在这里输入简要备注"/>
      </div>
      <DateBar class="date-bar" :value.sync="record.createdAt"
      type="date"
      field-name="日期" placeholder="请在这里输入日期"/>
      <Calculator ref="Calculator" @update:sum="onUpdateSum" @submit="saveRecord"/>
      <!-- {{recordList}} -->
	</div>
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
		get tagsIn(): Tag[] {
			return this.$store.getters.fetchTagsIn;
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
				(this.$refs.Calculator as any).clear();
			}
		}
	}
</script>

<style lang="scss" scoped>
#money {
	// #f1d3a7 #ffeab9 #ffb70e #d6843c #fcb577 #fdab90 #fe8867
	background: #fff;
	caret-color: transparent;
	&::v-deep .note-bar {
		caret-color: auto;
	}
	&::v-deep .wrapper>.content {
		justify-content: space-between;
	}
}
</style>