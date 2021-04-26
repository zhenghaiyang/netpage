<template>
  <div class="el-header-container">
    <div class="left-icon-container">
      <img
        class="LogoImg"
        :src="Logo"
        alt=""
        style="height: 30px; position: fixed; top: 5px; left: 5px"
        @click="() => $router.push({ name: 'home' })"
      />
    </div>
    <div class="nav-menu-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title"
            >我的工作台</template
          >
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title"
              >选项4</template
            >
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"
          ><a href="https://www.ele.me" target="_blank"
            >订单管理</a
          ></el-menu-item
        >
      </el-menu>
    </div>
    <div class="right-icon-container">
      <a-popover placement="bottom">
        <template slot="content">
          <div>
            <p
              class="icon-menu-item"
              @click="() => (changePasswordModalIsShow = true)"
            >
              修改密码
            </p>
            <p class="icon-menu-item" @click="this.logOut">登出</p>
          </div>
        </template>
        <div class="right-icon">
          <a-icon type="user" />
          <span class="username">{{ lastName + firstName }}</span>
        </div>
      </a-popover>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png';
import { mapActions } from 'vuex';

import store from '@store';
import clone from 'ramda.clone';
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      activeIndex: '1',
      Logo,
      tMenu: [],
      path: window.location.pathname,
      changePasswordModalIsShow: false,
      buttonIsLoading: false,
      editFormData: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
      editFormItems: [
        {
          field: 'currentPassword',
          title: '原密码',
          span: 20,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入', type: 'password' },
          },
        },
        {
          field: 'newPassword',
          title: '新密码',
          span: 20,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入', type: 'password' },
          },
        },
        {
          field: 'passwordStrength',
          span: 4,
          slots: {
            default: () => {
              return (
                <PasswordStrength password={this.editFormData.newPassword} />
              );
            },
          },
        },
        {
          field: 'newPasswordConfirm',
          title: '新密码确认',
          span: 20,
          itemRender: {
            name: '$input',
            props: { placeholder: '请输入', type: 'password' },
          },
        },
        {
          span: 24,
          align: 'center',
          collapseNode: false,
          itemRender: {
            name: '$buttons',
            children: [
              { props: { type: 'submit', content: '保存', status: 'primary' } },
            ],
          },
        },
      ],
      editFormRules: {
        currentPassword: [{ required: true, message: '请输入' }],
        newPasswordConfirm: [{ required: true, message: '请输入' }],
        newPassword: [{ required: true, message: '请输入' }],
      },
    };
  },
  computed: {
    permissions() {
      return store.state.user.permissions;
    },
    firstName() {
      return store.state.user.info.firstName;
    },
    lastName() {
      return store.state.user.info.lastName;
    },
  },
  watch: {
    $route(val) {
      this.path = window.location.pathname;
    },
    permissions: {
      immediate: true,
      handler: function(newval) {
        this.getTMenuTree(newval);
      },
    },
  },
  mounted() {
    // this.getTMenuTree(this.permissions)
    if (localStorage.getItem('needChangePassword')) {
      this.editFormData.currentPassword = '123456';
      this.changePasswordModalIsShow = true;
      localStorage.removeItem('needChangePassword');
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'ChangePassword']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getTMenuTree(arr) {
      const newArr = clone(arr)
        .map((v) => {
          v.meta = { title: '' };
          v.meta.title = v.name;
          v.name = v.code;
          v.depth = v.menuDepth;
          return v;
        })
        .filter((i) => !i.isHidden);
      const newMenus = newArr.map((v) => {
        const t = newArr.filter((i) => i.parentId === v.id);
        v.children = t;
        return v;
      });

      const data = newMenus.filter((v) => v.parentId === '0');
      console.log('menu data', data);
      if (data.length > 0) {
        this.menu = data;
      }
    },
    editSubmitEvent() {
      if (
        this.editFormData.newPassword === this.editFormData.newPasswordConfirm
      ) {
        this.changePassword();
      } else {
        this.$message.warning('新密码两次输入不一致');
      }
    },
    logOut() {
      this.Logout().then((res) => {
        this.$router.push('/user/login');
      });
    },
    async changePassword() {
      if (this.editFormData) {
        if (
          this.editFormData.newPassword === this.editFormData.newPasswordConfirm
        ) {
          if (
            !/[0-9]/.exec(this.editFormData.newPassword) ||
            !/[a-zA-Z]/.exec(this.editFormData.newPassword)
          ) {
            this.$message.warning('密码中必须有数字+字母');
          } else if (this.editFormData.newPassword.length < 6) {
            this.$message.warning('密码长度必须大于等于6位');
          } else {
            const res = await this.ChangePassword(this.editFormData);
            if (res.success) {
              this.$message.success('修改成功');
              this.logOut();
            } else {
              this.$message.success(res.msg);
              // this.$XModal.message({ message: res.msg, type: 'warning' })
            }
          }
          // if (
          //   /[0-9]/.exec(this.editFormData.newPassword) &&
          //   /[a-zA-Z]/.exec(this.editFormData.newPassword) &&
          //   this.editFormData.newPassword.length >= 6
          // ) {
          //   const res = await this.ChangePassword(this.editFormData)
          //   if (res.success) {
          //     this.$message.success('修改成功')
          //     this.logOut()
          //   } else {
          //     this.$message.success(res.msg)
          //     // this.$XModal.message({ message: res.msg, type: 'warning' })
          //   }
          // } else {
          //   this.$message.warning('密码强度过低')
          // }
        } else {
          this.$message.warning('新密码两次输入不一致');
        }
      } else {
        this.changePasswordModalIsShow = false;
        // this.$XModal.message({ message: '请输入新的密码', type: 'warning' })
      }
    },
  },
};
</script>

<style lang="less" scoped>
.level-2-title {
  color: rgba(0, 0, 0, 0.8) !important;
}
.link-nav {
  color: rgba(0, 0, 0, 0.6) !important;
}
.link-nav:hover {
  color: #0088d2 !important;
}
.nav-button-active {
  font-size: 14px !important;
  background-color: #0069ab !important;
}
.nav-button-active:hover {
  background-color: #ffffff !important;
}
</style>
