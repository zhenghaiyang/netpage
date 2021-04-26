import storage from 'store';
import { login, getInfo, changePassword } from '@service/User';
import router from '../../router';
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {
      username: '',
    },
    permissions: [],
    permissionsBindToken: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_PERMISSIONS: (state, info) => {
      state.permissions = info;
    },
    SET_PERMISSIONSBINDTOKEN: (state, info) => {
      state.permissionsBindToken = info;
    },
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((response) => {
          if (response.success) {
            if (response.data.token) {
              const result = response.data;
              storage.set(
                'ACCESS_TOKEN',
                result.token,
                7 * 24 * 60 * 60 * 1000,
              );
              commit('SET_TOKEN', result.token);
              // commit('SET_PERMISSIONSBINDTOKEN', result.token)
              dispatch('GetInfo');
              // commit('SET_INFO', result.user)
            }
          }
          resolve(response);
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, dispatch, state }) {
      if (localStorage.getItem('ACCESS_TOKEN')) {
        return new Promise((resolve, reject) => {
          getInfo()
            .then((response) => {
              if (response.success) {
                const result = response.data;
                commit('SET_INFO', result);
                resolve(response);
              } else {
                reject(response);
                dispatch('Logout');
              }
            })
            .catch((error) => {
              reject(error);
              dispatch('Logout');
            });
        });
      } else {
        return Promise.resolve();
      }
    },
    // 修改密码
    ChangePassword({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        changePassword({
          ...data,
          userId: state.info.id,
          data,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        storage.remove('ACCESS_TOKEN');
        router.push('/user/login');
        resolve();
      });
    },
  },
};

export default user;
