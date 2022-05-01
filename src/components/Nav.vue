<template>
    <div class="nav">
      <div class="nav-icon">
      <router-link to="/money" class="item" active-class="selected">
      <svg><use xlink:href="#money"></use></svg>
      <div class="text">账本</div>
      </router-link>
      </div>
      <div class="nav-icon">
      <router-link to="/labels" class="item" active-class="selected">
      <svg><use xlink:href="#labels"></use></svg>
      <div class="text">标签</div>
      </router-link>
      </div>
      <div class="nav-icon">
      <router-link to="/statistics" class="item" active-class="selected">
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
  caret-color: transparent;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);

  .nav-icon {
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
    .item {
      display: block;
      padding: 6px 0;
      color: #888;
    }
    .text {
      padding-top: 4px;
      font-size: 16px;
    }
  }
  svg {
    width: 3rem;
    height: 3rem;
    vertical-align: -0.45rem;
    fill: #888;
    overflow: hidden;
  }
  .item.selected {
    color: #333;
    > svg {
      fill: #333;
    }
  }
}
</style>