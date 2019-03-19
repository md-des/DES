import React, {Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
class Quit extends Component {
  logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };
  render() {
    const {user = {}} = this.props;
    const menu = () => {
      return (
        <Menu>
          <Menu.Item onClick={() => {router.push('/setting/user')}}>
            <Icon type="user"/> 用户
          </Menu.Item>
          {/* <Menu.Item>
            <Icon type="setting" /> 设置
          </Menu.Item> */}
          <Menu.Divider />
          <Menu.Item onClick={this.logout}>
            <Icon type="poweroff" /> 退出登录
          </Menu.Item>
        </Menu>
      );
    };
    return (
      <Dropdown overlay={menu}>
        <span style={{color: '#fff', cursor: 'pointer'}}>{user.name}</span>
      </Dropdown>
    );
  }
}
export default connect(state => ({
  user: state.userInfo.user
}))(Quit);