<template>
	<wrapper>
		<ul class="tags">
			<li v-for="tag in tags" :key="tag">{{tag}}</li>
		</ul>
		<div class="buttonWrapper">
			<button @click="createTag" class="createTag">新建标签</button>
		</div>
	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator'
	import { tagsModel } from '@/models/tagsModel'

	tagsModel.fetch();

	@Component
	export default class Labels extends Vue {
		tags = tagsModel.data;

		createTag(): void {
			const name = window.prompt('请输入标签名：');
			if(name !== null) {
				const message = tagsModel.create(name);
				if(message === 'duplicated') {
					window.alert('标签名重复！');
				} else if(message === 'empty') {
					window.alert('不能输入空标签！');
				}
			}
		}
		// delTag() {
		// 	tagsModel.delete(name);
		// }
	}
</script>

<style lang="scss" scoped>
	.tags {
		background: #fff;
		font-size: 16px;
		padding-left: 20px;
		>li {
			min-height: 44px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
		}
		svg {
			width: 18px;
			height: 18px;
			color: #666;
			margin-right: 20px;
		}	
	}
	.buttonWrapper {
		text-align: center;
		padding: 16px;
		margin-top: 30px;

		.createTag {
			background: #656565;
			color: #eee;
			border: none;
			border-radius: 4px;
			font-size: 16px;
			height: 40px;
			padding: 0 16px;
		}
	}
</style>