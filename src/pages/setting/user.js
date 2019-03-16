import React, { Component } from 'react';
import { Button, Input, message, Divider, Avatar, Upload, Icon } from 'antd';
import {connect} from 'dva';
import {user as userAjax} from 'request';
class UserSetting extends Component {
  state = {}
  componentDidMount() {
    this.setValue(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this.setValue(nextProps)
  }
  setValue = (props) => {
    const {user = {}} = props;
    const imageUrl = user.avatar;
    const userName = user.name;
    this.setState({
      imageUrl,
      userName
    })
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info) => {
    const {dispatch} = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const {code, data} = info.file.response
      if (code === 1000) {
        message.success('修改成功！')
        this.setState({
          imageUrl: data.name
        })
        const user = JSON.parse(localStorage.getItem('user'));
        user.avatar = data.name
        dispatch({
          type: 'userInfo/updateUserInfo',
          payload: {
            user
          }
        });
      }
      // this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      //   imageUrl,
      //   loading: false,
      // }));
    }
  }
  changeName = (e) => {
    const name = e.target.value;
    this.setState({
      userName: name
    })
  }
  onSubmit = () => {
    const {userName} = this.state;
    const {user = {}, dispatch} = this.props;
    userAjax.update({
      params: {
        _id: user._id,
        name: userName
      }
    }).then(r => {
      if (r.code === 1000) {
        message.success('修改成功');
        user.name = r.data.name;
        dispatch({
          type: 'userInfo/updateUserInfo',
          payload: {
            user
          }
        })
      }
    })
  }
  render() {
    const {imageUrl, userName} = this.state;
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const props = {
      name: 'file',
      action: '/api/file/uploadAvatar',
      headers: {
        authorization: 'authorization-text',
      },
      data: {
        userId
      },
      showUploadList: false,
      onChange: this.handleChange,
    };
    return (
      <div>
        <h3>资料设置</h3>
        <Avatar size={80} icon="user" src={imageUrl && '/api/'+imageUrl} />
        <Upload {...props} style={{margin: '0 20px'}}>
          <Button>
            <Icon type="upload" /> 更改图片
          </Button>
        </Upload>
        <Divider orientation="left">用户名</Divider>
        <Input style={{ width: '200px' }}  value={userName} onChange={this.changeName}/>
        <div style={{ height: '20px' }} />
        <Button type="primary" onClick={this.onSubmit}>保存</Button>
      </div>
    );
  }
}
export default connect(state => ({
  user: state.userInfo.user
}))(UserSetting);