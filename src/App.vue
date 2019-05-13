<template>
  <div class="app">
    <div class="app-button">
      <el-button @click="onclick"/>
    </div>
    <router-view></router-view>
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
    onclick() {
      let param = {}
      //this.request(this.api.getNewList,param,"post").then((res)=>{console.log("res",res)})
      this.$router.push({path:"/user"})
      // console.log("dasda",this)
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
