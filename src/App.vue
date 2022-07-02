<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.css";
@import "~@/assets/style/unit.scss";

body::-webkit-scrollbar{
	display: none;
}
#app {
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  text-align: center;
  color: #333;
  line-height: 1.5;
  // background: #f6f6f6;
  max-width: 600px;
  margin: 0 auto;
}
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: auto;

  .content {
  flex: 1;
  }
}

// #nav {
//   padding: 30px;
// }
@media screen and (max-width: 500px) {
    .el-message {
      min-width: 300px !important;
    }
}

@media screen and (max-width: 500px) {
    .el-message-box{
      width: 300px !important;
    }
}


</style>
<script lang="ts">

export default {

}
</script>
