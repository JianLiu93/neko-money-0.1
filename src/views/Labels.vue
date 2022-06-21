<template>
	<wrapper :style="{height:h+'px'}">
		<Types class="header" type="-" @update:type="updateType" />
		<ul v-if="type === '-'" class="tags">
			<li v-for="tag in tags" :key="tag.id">
				<router-link :to="{path:'/statistics', query:{id:'year'}}" class="tag">
					<span>{{tag.name}}</span>
					<Icon name="right-tangle" />
				</router-link>
			</li>
			<li class="createTag">
				<router-link to="./labels/add">
				<span>新建标签</span>
				</router-link>
				<!-- <Icon name="plus" /> -->
			</li>
		</ul>
		<ul v-else class="tags">
			<li v-for="tag in tagsIn" :key="tag.id">
				<router-link :to="{path:'/statistics', query:{id:'year'}}" class="tag">
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
	}
</script>

<style lang="scss" scoped>
	.tags {
		background: #fff;
		font-size: 16px;
		padding-left: 20px;
		margin-top: 2px;
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