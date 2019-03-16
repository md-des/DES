import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import SideBar from 'components/SideBar';
import style from './baseLayout.less';
import Bread from 'components/Bread';
import Quit from 'components/Quit';
import { connect } from 'dva';
const { Header, Content } = Layout;
class BseicLayout extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    if (localStorage.getItem('user')) {
      dispatch({
        type: 'userInfo/updateUserInfo',
        payload: {
          user: JSON.parse(localStorage.getItem('user')),
        }
      });
    }
  }
  render() {
    const {user = {}} = this.props;
    const imageUrl = user.avatar
    return (
      <Layout className={style.baseLayout}>
        <Header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="logo" style={{ width: '200px' }}>
            <Avatar size={50} icon="user" src={imageUrl && '/api/' + imageUrl} />
          </div>
          <div className="logout" style={{ textAlign: 'center' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['3']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Icon type="github" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="bell" />
              </Menu.Item>
              <Menu.Item key="3">
                <Quit />
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Layout>
          <SideBar {...this.props} />
          <Layout style={{ padding: '0 24px 24px', minHeight: 'auto' }}>
            <Bread {...this.props} />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 'auto',
                backgroundColor: '#fff',
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default connect(state => ({
  user: state.userInfo.user
}))(BseicLayout);
