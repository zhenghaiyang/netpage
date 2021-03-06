import axios from 'axios';
import codes from '@/assets/code/code.js';
import lang from '@/assets/lang/lang.js';
import { Loading, Message } from 'element-ui';
import Storage from '@/assets/storage/storage.js';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let accessToken = Storage.getLocalStorage('accessToken')
    if (accessToken) {
      //如果存在token
      config.headers['Authorization'] = 'accessToken'
      config.headers['Content-Type'] = 'application/json'
      // config.headers['Accept'] = 'application/json, text/plain, */*'
    } else {
      config.headers['Authorization'] = ''
      config.headers['Content-Type'] = 'application/json'
      // config.headers['Accept'] = 'application/json, text/plain, */*'
    }
    return config
  },
  function (error) {
    //当出现请求错误是做一些事
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log("response", response)
  const resp = response && response.data
  if (resp.errorCode) {
    Message.error(codes[resp.errorCode])
    return resp;
  }
  return resp
}, function (error) {
  console.log("response-error", error.response)
  const { status } = error.response
  switch (status) {
    case 400:
      Message.error(codes["1000400"])
      break;
    default:
      break;
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

const _getLoading = function (text) {
  const loading = Loading.service({
    lock: true,
    text: text ? text : lang.loading,
    fullscreen: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return loading
}
// url 请求地址
// param 参数
// option 请求类型
// text 加载时的 文字说明
const request = ({ url, param, option, text }) => {
  const loading = _getLoading(text);
  let options = {}
  switch (option.toLocaleUpperCase()) {
    case "POST":
      options = {
        url: url,
        data: param,
        method: option,
      }
      break;
    case "GET":
      options = {
        url: url,
        params: param,
        method: option,
      }
      break;
    default:
      options = {
        url: url,
        params: param,
        method: option,
      }
      break;
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        loading && loading.close()
        return resolve(res)
      })
      .catch((err) => {
        loading && loading.close()
        return reject(err);
      })
  })
}
export default request