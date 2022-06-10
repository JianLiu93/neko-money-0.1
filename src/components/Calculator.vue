<template>
	<div class="calculator">
		<div class="numberBar">
			<div class="formula">{{formula}}</div>
			<div class="output">{{output}}</div>
		</div>
		<ul class="buttonPad">
			<li>
				<button @click="inputContent('1')">1</button>
				<button @click="inputContent('2')">2</button>
				<button @click="inputContent('3')">3</button>
				<button @click="inputSymbol('+')">+</button>
				<button @click="clear">清除</button>
			</li>
			<li>
				<button @click="inputContent('4')">4</button>
				<button @click="inputContent('5')">5</button>
				<button @click="inputContent('6')">6</button>
				<button @click="inputSymbol('-')">-</button>
				<button @click="inputSymbol('=')">=</button>
			</li>
			<li>
				<button @click="inputContent('7')">7</button>
				<button @click="inputContent('8')">8</button>
				<button @click="inputContent('9')">9</button>
				<button @click="inputSymbol('×')">×</button>
				<button @click="ok" class="ok">OK</button>
				<button @click="inputContent('0')">0</button>
				<button @click="inputContent('.')">.</button>
				<button @click="backspace">回退</button>
				<button @click="inputSymbol('÷')">÷</button>
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
		formula = '';
		one = 0;
		two = 0;
		result = 0;

		inputContent(content: string) :void {
			if(this.output === 'error') return;
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
		// 做加减乘除运算
		calculate() :void {
			if(this.output === 'error') return;
			if(this.formula.indexOf('+') >=0) {
				this.one = Number(this.formula.slice(0, -1));
				this.two = Number(this.output);
				this.result = this.one + this.two;
			}
			else if(this.formula.slice(-1).indexOf('-') >=0) {
				this.one = Number(this.formula.slice(0, -1));
				this.two = Number(this.output);
				this.result = this.one - this.two;
			}
			else if(this.formula.indexOf('×') >=0) {
				this.one = Number(this.formula.slice(0, -1));
				this.two = Number(this.output);
				if(this.two === 0) {this.two = 1;}
				this.result = this.one * this.two;
			}
			else if(this.formula.indexOf('÷') >=0) {
				this.one = Number(this.formula.slice(0, -1));
				this.two = Number(this.output);
				if(this.two === 0) {this.two = 1;}
				this.result = Math.round(this.one / this.two *100000000)/100000000;
			} else {
				this.one = Number(this.output);
				this.two = 0;
				this.result = this.one;
			}

		}
		inputSymbol(symbol: string) :void {
			if(this.output === 'error') return;
			this.calculate();
			if(!isFinite(this.result) || this.result >= 1E16) {
				this.output = 'error';
				this.formula = 'error';
				this.one = 0;
				this.two = 0;
				this.result = 0;
				return;
			}
			if(symbol === '=') {
			this.output = String(this.result).slice(0,15);
			this.formula = String(this.result).slice(0,15);
			} else {
			this.output = '0';
			this.formula = String(this.result).slice(0,15) + symbol;
			}
		}
		clear() :void {
			this.output = '0';
			this.formula = '';
			this.one = 0;
			this.two = 0;
			this.result = 0;
		}
		backspace() :void {
			if(this.output === 'error') return;
			if(this.output.length == 1) {
				this.output = '0';
			} else {
				this.output = this.output.slice(0, -1);
			}
			return;
		}
		ok() :void {
			if(this.output === 'error') return;
			this.inputSymbol('=');
			if(Number(this.output) <= 0) {
				alert('金额为0或负值！');
				return;
			}
			if(Number(this.output) < 0.01) {
				alert('金额过小！无法记录');
				return;
			}
			this.output = String(Math.round(Number(this.output) *100)/100);
			this.$emit('update:sum', this.output);
			this.$emit('submit', this.output);
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/unit.scss";

  .calculator {
    .numberBar {
      @extend %clearFix;
      @extend %innerShadow;
      font-family: Consolas, monospace;
      padding: 2px 30px 2px 30px;
      text-align: right;
      height: 56px;
      background-color: #fff;
	}
    .formula {
      font-size: 14px;
      height: 16px;
      line-height: 16px;
	}
    .output {
      font-size: 36px;
      height: 40px;
      line-height: 40px;
    }
    .buttonPad {
      background-color: #fff;
      >li {
       display: block;
      @extend %clearFix;

      >button {
        $bg: #F2F2F2;
		cursor: pointer;
		margin: 2px;
        width: calc(20% - 4px);
        height: 54px;
        font-size: 20px;
        float: left;
        background-color: $bg;
		background-clip: content-box;
        border: none;
		border-radius: 10px;
        // &.zero {
        //   width: 25*2%;
        // }
		&:nth-child(4), &:nth-child(5), &:nth-child(7), &:nth-child(8), &:nth-child(9) {
          font-size: 26px;
          background-color: darken($bg, 4*2%);
		}
		&:nth-child(8) {
          font-size: 20px;
		}
        &.ok {
          height: 56*2px;
          float: right;
          background-color: darken($bg, 4*4%);
        }
		&:hover {
			background-color: #f6dab0;
		}
      }
    }
    }
  }
</style>