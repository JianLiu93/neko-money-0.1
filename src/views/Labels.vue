<template>
	<wrapper>
		<ul class="tags">
			<li v-for="tag in tags" :key="tag.id">
				<router-link :to="`./labels/edit/${tag.id}`" class="tag">
					<span>{{tag.name}}</span>
					<Icon name="right-tangle" />
				</router-link>			
			</li>
		</ul>
		<div class="buttonWrapper">
			<AddButton @click="createTag" class="createTag">新建标签</AddButton>
		</div>
	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component } from 'vue-property-decorator'

	@Component
	export default class Labels extends Vue {
		get tags(): Tag[] | null {
			return this.$store.state.tagList;
		}
		
		beforeCreate(): void {
			this.$store.commit('fetchTags');
		}
		createTag(): void {
			const name = window.prompt('请输入标签名：');
			if(name !== null) {
				this.$store.commit('createTags', name);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tags {
		background: #fff;
		font-size: 16px;
		padding-left: 20px;
		margin-top: 10px;
		>li {
			border-bottom: 1px solid #e6e6e6;
			list-style: none;
			.tag {
			min-height: 2.5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			>span {
				display: inline-block;
			}
			>svg {
				width: 1.5rem;
				height: 1.5rem;
				vertical-align: -0.15rem;
				fill: #888;
				overflow: hidden;
				margin-right: 20px;
			}
			}
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