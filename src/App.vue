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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }
a {
  color: inherit;
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .content {
  border: 1px solid red;
  flex: 1;
  }
}

#nav {
  padding: 30px;
}
</style>
<script lang="ts">

export default {

}
</script>
