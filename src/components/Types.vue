<template>
	<div>
		<ul class="types">
			<li :class="{selected: myType === '-', 
			[classPrefix + '-item']: classPrefix}"
			@click="selectType('-')">支出</li>
			<li :class="{selected: myType === '+', 
			[classPrefix + '-item']: classPrefix}"
			@click="selectType('+')">收入</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop, Watch } from 'vue-property-decorator'

	@Component
	export default class Types extends Vue {
		@Prop(String) readonly type!: string;
		@Prop(String) readonly classPrefix?: string;

		myType = this.type;
		
		selectType(type: string) :void {
			if((type !== '-') && (type !== '+')) {
				throw new Error('wrong type');
			}
			this.myType = type;
		}

		@Watch('myType')
		onTypeChanged(value: string): void {
			this.$emit('update:type', value);
		}
		
	}
</script>

<style lang="scss" scoped>
  .types {
    background: #fee101;
    display: flex;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    overflow-x: auto;
    caret-color: transparent;

    @media (max-width: 500px) {
      &::-webkit-scrollbar {
        display: none;
      }
    }
    &::-webkit-scrollbar {
      width: 1px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
    }
    >li {
      cursor: pointer;
      flex: 1;
      width: 50%;
      min-width: 13.6%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #5b3611;
		border-radius: 2px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>