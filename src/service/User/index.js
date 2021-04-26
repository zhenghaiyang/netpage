import request from '@request';
import api from '@api';

// url, param, option, text
export function login(params) {
  return request({
    url: api.getNewList,
    param: params,
    option: 'post',
    text: '加载中',
  });
}
// url, param, option, text
export function getInfo(params) {
  return request({
    url: api.getNewList,
    param: params,
    option: 'post',
    text: '加载中',
  });
}

// url, param, option, text
export function changePassword(params) {
  return request({
    url: api.getNewList,
    param: params,
    option: 'post',
    text: '加载中',
  });
}
