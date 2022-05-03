<template>
  <div>
    <wrapper>
	<div class="tags">
      <ul class="tag-list">
		<li class="current">衣装</li>
		<li>美食</li>
		<li>住宿</li>
		<li>出行</li>
		<li>网络</li>
      </ul>
      <div class="new">
		<button>新增标签</button>
      </div>
	</div>

      <div class="remark">
		<label for="">
			<span>备注</span>
			<input type="text" />
		</label>
      </div>
	<Types />
	<Calculator />
    </wrapper>
  </div>
</template>

<script lang="ts">
	import Types from '@/components/Types.vue'
	import Calculator from '@/components/Calculator.vue'

	export default {
		name: 'Money',
		components: {Types, Calculator},		
	}
</script>

<style lang="scss" scoped>

</style>