import { Layout, Menu } from 'antd';
import SideBar from 'components/SideBar';
import style from './baseLayout.less';
import Bread from 'components/Bread'
const { Header, Content } = Layout;
export default (props) => {
  const { location: { pathname } = {} } = props;
  return (
    <Layout className={style.baseLayout}>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <SideBar {...props}/>
        <Layout style={{ padding: '0 24px 24px'}}>
          <Bread {...props}/>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: pathname === '/document/new' ? '#2c2c2c' : '#fff'
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
