<template>
	<div>
	<label for="" class="label">
		<span>{{fieldName}}</span>
		<input :type="type"
		:value="onForm(value)"
		@input="onValueChange($event.target.value)"
		:placeholder="placeholder">
	</label>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator'
	import dayjs, { OpUnitType } from 'dayjs'

	@Component
	export default class DateBar extends Vue {

		@Prop({default: ''}) readonly value!:string;
		@Prop({required: true}) readonly fieldName!:string;
		@Prop({default: ''}) readonly placeholder!:string;
		@Prop() readonly type?:string;

		onForm(value: string): string {
			if(this.type === 'date') {
				return dayjs(value).format('YYYY-MM-DD');
			} else {return value;}
		}

		onValueChange(value: string): void {
			this.$emit('update:value', value);
		}
	}
</script>

<style lang="scss" scoped>
	.label {
		text-align: center;
		>span {
			padding: 0 20px;
		}
	}
</style>