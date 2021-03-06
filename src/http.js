import axios from 'axios'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json';        //配置请求头
axios.defaults.baseURL = 'http://127.0.0.1:8080';   //配置接口地址
axios.defaults.headers.get['Access-Control-Allow-Origin']='*';
axios.defaults.headers.post['Access-Control-Allow-Origin']='*';
// //POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//   //在发送请求之前做某件事
//   if(config.method  === 'post'){
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// },(error) =>{
//   console.log('错误的传参')
//   return Promise.reject(error);
// });
//
// //返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) =>{
//   //对响应数据做些事
//   if(!res.data.success){
//     return Promise.resolve(res);
//   }
//   return res;
// }, (error) => {
//   console.log('网络异常')
//   return Promise.reject(error);
// });

////返回一个Promise
//post
export function postAction(url,parameter) {
  return axios({
    url: url,
    method:'post' ,
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url,parameter,method) {
  return axios({
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putAction(url,parameter) {
  return axios({
    url: url,
    method:'put',
    data: parameter
  })
}

//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}