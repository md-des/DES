import React, { Component } from 'react';
import { Button, Input, message, Divider, Avatar, Upload, Icon } from 'antd';
import { connect } from 'dva';
class UserSetting extends Component {
  state = {}
  componentDidMount() {
    const {user = {}} = this.props;
    const imageUrl = user.avatar
    this.setState({
      imageUrl
    })
  }
  componentWillReceiveProps(nextProps) {
    const {user = {}} = nextProps;
    const imageUrl = user.avatar
    this.setState({
      imageUrl
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
      // Get this url from response in real world.
      // this.setState({
      //   imageUrl: 
      // })
      // this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      //   imageUrl,
      //   loading: false,
      // }));
    }
  }
  render() {
    const {imageUrl} = this.state;
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
        <Input style={{ width: '200px' }} />
        <div style={{ height: '20px' }} />
        <Button type="primary">保存</Button>
      </div>
    );
  }
}
export default connect(state => ({
  user: state.userInfo.user
}))(UserSetting);