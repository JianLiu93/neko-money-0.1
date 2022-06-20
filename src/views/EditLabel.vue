<template>
	<wrapper :style="{height:h+'px'}">
		<div class="top-bar">
			<Icon class="back" name="left-tangle" @click="goBack"/>
			<span>添加标签</span>
		</div>
		<Tags :data-tags="tagList" :add="false" @update:tag="onUpdateTag" />
		<div class="edit-label">
				<AddButton class="add-button" @click="add">添加预设标签</AddButton>
				<AddButton class="custom-button" @click="customTag">自定义标签名</AddButton>
			<!-- <div>{{inputTag}}</div> -->
		</div>
	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'
	import Notes from '@/components/Notes.vue';
	import Tags from '@/components/Tags.vue';
	import { tagsModel } from '@/models/tagsModel';

	@Component({
		components: { Notes, Tags },
	})
	export default class EditLabel extends Vue {

		h = document.documentElement.clientHeight;

		inputTag: Tag = {id:'', name:'', icon:''};
		tagList = tagsModel.iconList;

		get tag(): Tag | null {
			return this.$store.state.currentTag;
		}

		// beforeCreate(): void {
		// 	this.$store.commit('fetchTags');
		// 	const id = this.$route.params.id;
		// 	this.$store.commit('setCurrentTag', id);
		// }
		// created(): void {
		// 	if(!this.tag) {
		// 		this.$router.replace('/404');
		// 	}
		// }

		onUpdateTag(tagName: string): void {
			this.inputTag.name = tagName;
			if(tagName === '') {
				this.inputTag.icon = '';
				return;
			}
			this.inputTag.icon = this.tagList.filter(i => i.name === tagName)[0].icon;
		}

		add(): void {
			if(this.tag) {
			this.$store.commit('createTags', {name: this.inputTag.name});
			}
		}
		customTag(): void {
			if(!this.inputTag.name) {
				alert('请选择您心仪的图标!');
			} else {
				this.inputTag.name = prompt('请输入新的名称：') || 'default';
				this.$store.commit('createTags', { name: this.inputTag.name, icon: this.inputTag.icon });
			}
		}

		remove(): void {
			if(this.tag) {
				this.$store.commit('removeTags', this.tag.id);
				this.goBack();
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
				cursor: pointer;
			}
	}
	.edit-label {
		margin-top: 30px;
		margin-bottom: 30px;
		.button {
		margin: 0 40px;
		background: #fff0f0;
		color: #ff5900;
		border: 1px solid #ff5900;
		border-radius: 4px;
		font-size: 16px;
		height: 40px;
		padding: 0 16px;
		cursor: pointer;
		}
		.custom-button {
		background: #d2e8cf;
		color: #41b883;
		border: 1px solid #41b883;
		}
	}
</style>