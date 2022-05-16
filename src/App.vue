<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  line-height: 1.5;
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
</style>
<script lang="ts">

export default {

}
</script>
