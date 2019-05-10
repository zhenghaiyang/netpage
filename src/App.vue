<template>
  <div class="app">
    <div class="app-button">
      <el-button @click="click"/>
    </div>
  </div>
</template>

<script lang="js">
import {mapActions,mapState,mapMutations} from 'vuex';
export default {
  name: 'app',
  data(){
    return {

    }
  },
  mounted() {
    
  },
  computed: {
    ...mapState("test",["userInfo"])
  },
  methods: {
    click() {
      console.log("this",this.api)
      console.log("ssssss",this.userInfo)
    }
  },
}
</script>

<style lang="less">
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .app-button {
    width:100px;
    height:100px;
    background:red;
  }
}
</style>
