<template>
  <div>
    <wrapper>
	<Tags :data-tags="tags" @update:tag="onUpdateTag" />
	<Notes class="noteBar" @update:value="onUpdateNote"
	field-name="备注" placeholder="请在这里输入简要备注"/>
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
	
	@Component({
		components: { Tags, Notes, Types, Calculator },
	})
	export default class Money extends Vue {
		// tags = ['美食', '住宿', '出行', '衣妆', '娱乐'];
		get tags(): Tag[] | null {
			return this.$store.state.tagList;
		}

		record: RecordData = {
			tag:'', note:'', type: '-', sum: 0
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
			} else {
				this.$store.commit('createRecords',this.record);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>