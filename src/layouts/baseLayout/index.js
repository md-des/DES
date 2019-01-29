import { Layout, Menu, Icon } from 'antd';
import SideBar from 'components/SideBar';
import style from './baseLayout.less';
import Bread from 'components/Bread';
import Quit from 'components/Quit';
const { Header, Content } = Layout;
const img = require('static/images/logo.jpg');
export default props => {
  const { location: { pathname } = {} } = props;
  return (
    <Layout className={style.baseLayout}>
      <Header className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="logo" style={{ width: '200px' }}>
          <img src={img} alt="" style={{ width: '40px', height: '40px', borderRadius: '20px' }} />
        </div>
        <div className="logout" style={{ textAlign: 'center' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
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
        <SideBar {...props} />
        <Layout style={{ padding: '0 24px 24px', minHeight: 'auto' }}>
          <Bread {...props} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 'auto',
              backgroundColor: pathname === '/document/new' ? '#2c2c2c' : '#fff',
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
