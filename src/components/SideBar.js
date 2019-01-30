import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
const { SubMenu } = Menu;
const { Sider } = Layout;
export default props => {
  const { sideList } = props;
  const loop = list => {
    return list.map((i, index) => {
      return (
        <SubMenu
          key={i.name}
          title={
            <span>
              <Icon type="user" />
              {i.name}
            </span>
          }
        >
          {i.children.map((l, idx) => {
            return (
              <Menu.Item key={i.name + idx}>
                <Link to={l.path}>{l.name}</Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  };
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultOpenKeys={[sideList[0].name]}
        defaultSelectedKeys={['0']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {loop(sideList)}
      </Menu>
    </Sider>
  );
};
