<template>
	<div class="tags">
      <div class="new">
		<button @click="newTag">新增标签</button>
      </div>
      <ul class="tag-list">
		<li v-for="tag in dataTags" :key="tag"
		:class="selectedTag === tag ? 'selected':''"
		@click="toggle(tag)">{{tag}}</li>
      </ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import {Component, Prop} from 'vue-property-decorator'

	@Component
	export default class Tags extends Vue {
		@Prop(Array) readonly dataTags!: string[];
		
		selectedTag = '';

		toggle(tag: string): void {
			if(this.selectedTag === tag) {
				this.selectedTag = '';
			} else {
				this.selectedTag = tag;
			}
			this.$emit('update:tag', this.selectedTag);
		}
		newTag(): void {
			const name = window.prompt('请输入新标签名');
			if(name === '') {
				window.alert('标签为空！');
			} else if(this.dataTags) {
				this.$emit('update:dataTags', [...this.dataTags, name]);
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