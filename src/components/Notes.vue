<template>
	<div>
	<label for="" class="label">
		<span>{{fieldName}}</span>
		<input type="text"
		v-model="note"
		:placeholder="placeholder"
		@blur="submit">
		<!-- <button @click="submit">确定</button> -->
	</label>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator'

	@Component
	export default class Notes extends Vue {

		@Prop({default: ''}) readonly value!:string;
		@Prop({required: true}) readonly fieldName!:string;
		@Prop({default: ''}) readonly placeholder!:string;

		note = this.value;

		submit(): void {
			this.$emit('update:value', this.note);
		}
	}
</script>

<style lang="scss" scoped>

</style>