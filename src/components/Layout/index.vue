<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
        ><Header
      /></a-layout-header>
      <a-layout-content class="multiple-tab-container">
        <MultiTab />
      </a-layout-content>
      <a-layout class="content-sider-container">
        <!-- <a-layout-sider style="width: 20px"><Sider /></a-layout-sider> -->
        <a-layout-content><router-view></router-view></a-layout-content>
      </a-layout>
      <!-- <a-layout-footer><Footer /></a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
import { MultiTab, Header } from '@/components';
import './index.less';
export default {
  name: 'Layout',
  components: {
    Header,
    MultiTab,
  },
  data() {
    return {
      headerTree: [],
      siderArr: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less"></style>
