import axios from 'axios';
import {message} from 'antd';
export default function(opt) {
  if (opt) {
    opt.url = "http://" + process.env.host + ':' + process.env.port + "/" + opt.url;
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