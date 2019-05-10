import axios from 'axios';
import codes from '@/assets/code/code.js'


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


const request =(url,param,option)=>{
    axios({
        url:url,
        params:param,
        method:option
    })
    .then((res)=>{
        return  Promise.resolve(res)
    })
    .catch((err)=>{
        return Promise.reject(err);
    })
}
export default request