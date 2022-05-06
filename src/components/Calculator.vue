<template>
	<div>
		<div class="numberBar">
			<div class="output">{{output}}</div>
		</div>
		<ul class="buttonPad">
			<li>
				<button @click="inputContent('1')">1</button>
				<button @click="inputContent('2')">2</button>
				<button @click="inputContent('3')">3</button>
				<button @click="inputContent('')">＋</button>
				<button @click="clear()">清除</button>
			</li>
			<li>
				<button @click="inputContent('4')">4</button>
				<button @click="inputContent('5')">5</button>
				<button @click="inputContent('6')">6</button>
				<button>－</button>
				<button @click="backspace()">回退</button>
			</li>
			<li>
				<button @click="inputContent('7')">7</button>
				<button @click="inputContent('8')">8</button>
				<button @click="inputContent('9')">9</button>
				<button>✖</button>
				<button @click="ok()">OK</button>
			</li>
			<li>
				<button @click="inputContent('0')">0</button>
				<button @click="inputContent('.')">.</button>
				<button>%</button>
				<button>➗</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { Component, Prop } from 'vue-property-decorator';

	@Component
	export default class Calculator extends Vue {
		output = '0';

		inputContent(content: string) :void {
			if(this.output.length === 16) {return;}
			if((this.output === '0') && ('0123456789'.indexOf(content) >=0)) {
				this.output = content;
				return;
			}
			if((this.output.indexOf('.') >=0) && (content === '.')) {
				return;
			}
			this.output += content;
		}
		clear() :void {
			this.output = '0';
		}
		backspace() :void {
			if(this.output.length == 1) {
				this.output = '0';
			} else {
				this.output = this.output.slice(0, -1);
			}
			return;
		}
		ok() :void {
			this.$emit('update:sum', this.output);
			this.$emit('submit', this.output);
			this.output = '0';
		}
	}
</script>

<style lang="scss" scoped>
	.numberBar {
		font-size: 44px;
	}
	.buttonPad {
		>li {
			
		}
		button {
			margin: 4px;
			padding: 0 8px;
			font-size: 26px;
		}
	}
</style>