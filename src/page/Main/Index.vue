<template>
  <div>
    <button @click="onlcik">点击触发vuex action方法</button>
    <button @click="onlcikB">点击触发vuex Mutations方法</button>
    <button @click="onlcikC">点击触发vuex request方法</button>
    <div>{{message}}</div>
    <div>{{info}}</div>
    <div>{{infoB}}</div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("main", ["message", "info", "infoB"]),
  },
  methods: {
    ...mapActions("main", ["actionsA", "actionsB"]),
    ...mapMutations("main", ["mutationsB"]),
    onlcik() {
      this.actionsA();
    },
    onlcikB() {
      this.mutationsB();
    },
    onlcikC() {
      this.actionsB();
    },
  },
};
</script>
<style lang="less" scope>
</style>
