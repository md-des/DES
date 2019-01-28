import axios from 'axios';
import {message} from 'antd';
const HOST = 'http://localhost';
const PORT = '8001/'
export default function(opt) {
  if (opt) {
    opt.url = HOST + ':' + PORT + opt.url;
    return axios(opt).then((res) => {
      if (res && res.data && res.data.code === 2000) {
        message.error(res.data.msg)
      }
      return res.data;
    }).catch(err => {
      console.error('network error!', err)
    })
  }
}