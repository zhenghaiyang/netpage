<template>
  <div class="app">
    <el-header></el-header>
    <router-view></router-view>
  </div>
</template>

<script lang="js">
import {mapActions,mapState,mapMutations} from 'vuex';
export default {
  data(){
    return {
      
    }
  },
  mounted() {
    console.log("dasdasd")
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

</style>
