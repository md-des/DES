import axios from 'axios';
import {message} from 'antd';
import router from 'umi/router';
export default function(opt) {
  if (opt) {
    return axios(opt).then((res) => {
      if (res && res.data && res.data.code === 2000) {
        message.error(res.data.msg)
      }
      // 重定向
      if (res && res.data && res.data.code === 3000) {
        if (res.data.redirect) {
          router.push(res.data.redirect)
        }
      }
      return res.data;
    }).catch(err => {
      if (err.response) {
        const {status, statusText} = err.response;
        message.error(status + '  ' + statusText);
      } else {
        console.error('network error!', err);
      }
    })
  }
}