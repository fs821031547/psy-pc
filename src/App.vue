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

<style lang="less">
@import './app.less';
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.blank{
  overflow: hidden;
  height: 10px;
}
.blank-2{
  overflow: hidden;
  height: 20px;
}
.blank-3{
  overflow: hidden;
  height: 30px;
}
</style>
