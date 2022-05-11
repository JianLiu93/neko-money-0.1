<template>
	<div class="tags">
      <div class="new">
		<button @click="newTag">新增标签</button>
      </div>
      <ul class="tag-list">
		<li v-for="tag in dataTags" :key="tag.id"
		:class="selectedTag === tag.name ? 'selected':''"
		@click="toggle(tag)">{{tag.name}}</li>
      </ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import {Component, Prop} from 'vue-property-decorator'

	@Component
	export default class Tags extends Vue {
		@Prop(Array) readonly dataTags!: Tag[];
		
		selectedTag = '';

		toggle(tag: Tag): void {
			if(this.selectedTag === tag.name) {
				this.selectedTag = '';
			} else {
				this.selectedTag = tag.name;
			}
			this.$emit('update:tag', this.selectedTag);
		}
		newTag(): void {
			const name = window.prompt('请输入新标签名');
			if(!name) {
				window.alert('标签为空！');
			} else if(this.dataTags) {
				this.$store.commit('createTags', name);
			}
		}

	}
</script>

<style lang="scss" scoped>
.tags {
	.tag-list {
		>li {}
		li.selected {
			background: #eee;
		}
	}
}
</style>