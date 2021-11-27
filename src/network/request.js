import axios from 'axios'

export function request(config){
    const instance = axios.create({
      baseURL:'http://152.136.185.210:7878/api/hy66',
      timeout:5000
    })
    // //拦截器zxios
    axios.interceptors.request.use(config =>{
      console.log(config);
      return config
    },err => {
      // console.log(err);
    })
    axios.interceptors.response.use(res =>{
      console.log(res);
    },err => {
      console.log(err);
    })

    //发送真正的网络请求
   return instance(config)
}
