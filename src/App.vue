<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  color: #27253e;
  background-color: #f4efef;
  overflow-y: auto;
}
</style>
