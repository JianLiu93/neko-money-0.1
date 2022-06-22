<template>
	<wrapper :style="{height:h+'px'}">
		<Types class="header" type="-" @update:type="updateType" />
		<ul v-if="type === '-'" class="tags">
			<li v-for="tag in tags" :key="tag.id">
				<router-link :to="{path:'/statistics', query:{type:'-', id:'year'}}" class="tag">
					<span>{{tag.name}}<Icon :name="tag.icon" /></span>
					<Icon name="delete" @click.prevent="remove" />
				</router-link>
			</li>
			<li class="createTag">
				<router-link to="./labels/add">
				<span><Icon name="add" />新建标签</span>
				</router-link>
				<!-- <Icon name="plus" /> -->
			</li>
		</ul>
		<ul v-else class="tags">
			<li v-for="tag in tagsIn" :key="tag.id">
				<router-link :to="{path:'/statistics', query:{type:'+', id:'year'}}" class="tag">
					<span>{{tag.name}}</span>
					<Icon name="right-tangle" />
				</router-link>			
			</li>
		</ul>
	</wrapper>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Types from '@/components/Types.vue';
	import { Component } from 'vue-property-decorator'

	@Component({
		components: {Types},
	})
	export default class Labels extends Vue {

		h = document.documentElement.clientHeight;
		type = '-';

		get tags(): Tag[] | null {
			return this.$store.state.tagList;
		}
		get tagsIn(): Tag[] {
			return this.$store.getters.fetchTagsIn;
		}
		
		beforeCreate(): void {
			this.$store.commit('fetchTags');
		}
		updateType(value: string): void {
			this.type = value;
		}
		remove(e: MouseEvent): void {
			const parent = (e.currentTarget as ChildNode).parentElement as HTMLElement;
			const name = (parent.firstChild as HTMLElement).innerText;
			console.log(name);
			this.$confirm('确定要删除吗？', '删除笔记本', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
			}).then(() => {
				this.$store.commit('removeTags', name);
				this.$message.success('删除标签成功');
			}).catch(() => {
				this.$message.info('已取消');
			});
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/unit.scss";
	.tags {
		@extend %innerShadow;
		background: #fff;
		font-size: 16px;
		padding-left: 20px;
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
				>svg {
					margin-left: 10px;
				}
			}
			}
		}
		svg {
		width: 1.5rem;
		height: 1.5rem;
		vertical-align: -0.4rem;
		fill: #7d5744;
		overflow: hidden;
		margin-right: 20px;
		}
		.createTag {
			min-height: 40px;
			svg {
			width: 2rem;
			height: 2rem;
			margin: 8px 10px;
			vertical-align: -1.1rem;
			fill: #555;
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