<template>
  <div>
    <wrapper>
	<Tags :data-tags.sync="tags" @update:tag="onUpdateTag" />
	<Notes @update:note="onUpdateNote" />
	<Types @update:type="onUpdateType" />
	<Calculator @update:sum="onUpdateSum" />
	{{record}}
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

	type Record = {
		tag: string
		note: string
		type: string
		sum: number
	}

	@Component({
		components: { Tags, Notes, Types, Calculator },
	})
	export default class Money extends Vue {
		tags = ['美食', '住宿', '出行', '娱乐'];
		record: Record = {
			tag:'', note:'', type: '-', sum: 0
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
	}
</script>

<style lang="scss" scoped>

</style>