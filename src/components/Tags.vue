<template>
  <div class="tags">
    <ul class="tag-list">
      <li v-for="tag in dataTags" :key="tag.id"
      :class="selectedTag === tag.name ? 'selected':''"
      @click="toggle(tag)">
      <span><Icon :name="tag.icon" /></span>
      <span class="text">{{tag.name}}</span>
      <!-- <Icon name="" /> -->
      </li>
      <li v-if="add" class="new">
        <router-link to="./labels/add">
          <span><Icon name="add" /></span>
          <span>新增标签</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import {Component, Prop} from 'vue-property-decorator'

	@Component
	export default class Tags extends Vue {
		@Prop(Array) readonly dataTags!: Tag[];
		@Prop({default: true}) readonly add!: boolean;
		
		selectedTag = '';

		toggle(tag: Tag): void {
			if(this.selectedTag === tag.name) {
				this.selectedTag = '';
			} else {
				this.selectedTag = tag.name;
			}
			this.$emit('update:tag', this.selectedTag);
		}
		// newTag(): void {
		// 	const name = window.prompt('请输入新标签名');
		// 	if(!name) {
		// 		window.alert('标签为空！');
		// 	} else if(this.dataTags) {
		// 		this.$store.commit('createTags', {name: name});
		// 	}
		// }

	}
</script>

<style lang="scss" scoped>
  .tags {
    background-color: #fff;
    min-height: 200px;
    overflow: auto;
    font-size: 12px;
    padding: 2px 10px;
    flex-grow: 1;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    caret-color: transparent;
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
        $bg: #fefefe;
        background: $bg;
        $h: 60px;
        height: $h;
        width: calc(25% - 12px);
        text-overflow: ellipsis;
        border: 1px solid #e0e0e0;
        border-radius: $h/4;
        padding: 0px 10px;
        margin-top: 6px;
        margin-left: 6px;
        margin-right: 6px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &.selected {
          background: #ffe4b5;
        }
        &.new {
          padding: 0;
          > a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            svg {fill: #555;}
          }
        }
        >span {
          display: inline-block;
          max-height: 28px;
        }
        svg {
          width: 1.5rem;
          height: 1.5rem;
          fill: #7d5744;
          overflow: hidden;
        }
        .text {
          max-height: 32px;
        }
      }
    }
  }

</style>