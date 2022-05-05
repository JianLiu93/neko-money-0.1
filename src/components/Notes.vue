<template>
	<div class="noteBar">
	<label for="" class="notes">
		<span>备注</span>
		<input type="text"
		v-model="note"
		placeholder="请在这里输入简要备注">
		<button @click="submit">确定</button>
	</label>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'

	@Component
	export default class Notes extends Vue {
		note = '';

		submit(): void {
			this.$emit('update:note', this.note);
		}
	}
</script>

<style lang="scss" scoped>

</style>