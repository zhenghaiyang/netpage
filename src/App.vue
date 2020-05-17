<template>
  <div class="app">
    <el-header></el-header>
    <router-view></router-view>
  </div>
</template>

<script lang="js">
export default {

}
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
