<template>
	<wrapper>
		<div class="top-bar">
			<Icon name="left-tangle" @click="goBack"/>
			<span>编辑标签</span>
		</div>
		<div class="edit-label">
			<div class="label-name">{{tag.name}}</div>
			<Notes class="input-tag" @update:value="onChangeTag"
			field-name="标签名" placeholder="请输入标签名" />
			<AddButton class="del-button" @click="remove">删除标签</AddButton>
		</div>
	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'
	import { tagsModel } from '@/models/tagsModel';
	import Notes from '@/components/Notes.vue';

	@Component({
		components: { Notes },
	})
	export default class EditLabel extends Vue {
		tag: Tag = {id: '', name:''};

		created(): void {
			const id = this.$route.params.id;
			tagsModel.fetch();
			const tag = tagsModel.data.filter((item) => item.id === id)[0];
			if(tag) {
				this.tag = tag;
			} else {
				this.$router.replace('/404');
			}
		}
		onChangeTag(tagName: string): void {
			if(this.tag) {
				tagsModel.update(this.tag.id, tagName);
				this.tag.name = tagName;
			}
		}
		remove(): void {
			if(this.tag) {
				tagsModel.remove(this.tag.id);
			}
		}
		goBack(): void {
			this.$router.back();
		}
	}
</script>

<style lang="scss" scoped>
	.top-bar {
		position: relative;
		text-align: center;
		background: #fff;
		font-size: 16px;
		padding: 12px 20px;
		border-bottom: 1px solid #e6e6e6;

			span {
				display: inline-block;
			}
			svg {
				position: absolute;
				left: 20px;
				width: 1.5rem;
				height: 1.5rem;
				vertical-align: -0.15rem;
				fill: #666;
				overflow: hidden;
			}
	}
	.edit-label {
		text-align: center;
		.label-name {
			padding: 14px 0;
			font-size: 20px;
			vertical-align: middle;
			}
		.del-button {
		margin-top: 30px;
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