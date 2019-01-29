import React, {Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import router from 'umi/router';
export default class extends Component {
  logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };
  render() {
    const { location: { pathname } = {}, sideList } = this.props;
    const menu = () => {
      return (
        <Menu>
          <Menu.Item>
            <Icon type="user" /> 用户
          </Menu.Item>
          <Menu.Item>
            <Icon type="setting" /> 设置
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={this.logout}>
            <Icon type="poweroff" /> 退出登录
          </Menu.Item>
        </Menu>
      );
    };
    return (
      <Dropdown overlay={menu}>
        <span style={{ color: '#fff', cursor: 'pointer' }}>zlx</span>
      </Dropdown>
    );
  }
}
