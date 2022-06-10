<template>
  <div class="tags">
    <ul class="tag-list">
      <li class="new">
        <div @click="newTag">新增标签</div>
      </li>
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
    background-color: #fff;
    height: 200px;
    overflow: auto;
    font-size: 12px;
    padding: 2px 10px;
    flex-grow: 1;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
      &::-webkit-scrollbar {
        display: none;
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #eee;
    }
    > .tag-list {
      display: flex;
      flex-wrap: wrap;
      > li {
        cursor: pointer;
        $bg: #f5f5f5;
        background: $bg;
        $h: 60px;
        height: $h;
        width: calc(25% - 20px);
        text-overflow: ellipsis;
        line-height: $h;
        border-radius: $h/4;
        padding: 0px 10px;
        margin-top: 6px;
        margin-left: 10px;
        margin-right: 10px;
        &.selected {
          background: #fee101;
        }
      }
    }
  }

</style>