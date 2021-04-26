<template>
  <div>
    login
    <button @click="onlcik">登陆</button>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState('main', ['message', 'info', 'infoB']),
  },
  methods: {
    ...mapActions('main', ['actionsA', 'actionsB']),
    ...mapMutations('main', ['mutationsB']),
    onlcik() {
      console.log('.....', this);
      this.$router.push('/dashboard');
    },
  },
};
</script>
<style lang="less" scope></style>
