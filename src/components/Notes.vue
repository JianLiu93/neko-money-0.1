<template>
	<div class="noteBar">
	<label for="" class="notes">
		<span>备注</span>
		<input type="text" :note="note"
		@input="inputNote($event)"
		placeholder="请在这里输入简要备注">
		<button @click="print()">确定</button>
	</label>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'

	@Component
	export default class Notes extends Vue {
		note = '';
		inputNote(e: { target: HTMLInputElement }) :void {
				this.note = e.target.value;
		}
		print(): void {
			console.log(this.note);
		}
	}
</script>

<style lang="scss" scoped>

</style>