import request from '@request'
import api from '@api';

// url, param, option, text
export function getNewList (params) {
  return request({
    url: api.getNewList,
    param: params,
    option: "post",
    text: "加载中"
  })
}