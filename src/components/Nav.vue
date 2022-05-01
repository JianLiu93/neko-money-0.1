<template>
    <div class="nav">
      <div class="nav-icon">
      <router-link to="/money" class="item">
      <svg><use xlink:href="#money"></use></svg>
      <div class="text">账本</div>
      </router-link>
      </div>
      <div class="nav-icon">
      <router-link to="/labels" class="item">
      <svg><use xlink:href="#labels"></use></svg>
      <div class="text">标签</div>
      </router-link>
      </div>
      <div class="nav-icon">
      <router-link to="/statistics" class="item">
      <svg><use xlink:href="#statistics"></use></svg>
      <div class="text">统计</div>
      </router-link>
      </div>
    </div>
</template>

<script lang="ts">
	import moneyIcon from '@/assets/icons/money.svg'
	import labelsIcon from '@/assets/icons/labels.svg'
	import statisticsIcon from '@/assets/icons/statistics.svg'

  console.log(moneyIcon);
  console.log(labelsIcon);
  console.log(statisticsIcon);
  

	export default {
		name: 'Nav',
	}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  .nav-icon {
    border: 1px solid black;
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
    .item {
      display: block;
      padding: 6px 0;
    }
    .text {
      padding-top: 4px;
      font-size: 16px;
    }
  }
  svg {
    width: 4rem;
    height: 4rem;
    vertical-align: -0.6rem;
    fill: #666;
    overflow: hidden;
  }
}
</style>