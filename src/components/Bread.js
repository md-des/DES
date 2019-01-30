import { Breadcrumb } from 'antd';
import Link from 'umi/link';
export default props => {
  const { location: { pathname } = {}, sideList } = props;
  const rootPath = pathname.split('/')[1];
  const currentSide = Object.keys(sideList).find(i => sideList[i].path.indexOf(rootPath) !== -1);
  if (!currentSide) {return false}
  const currentSideList = sideList[currentSide];
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to={currentSideList.path}>{currentSideList.name}</Link>
      </Breadcrumb.Item>
      {currentSideList.children.map((i, index) => {
        if (i.path === pathname) {
          return (
            <Breadcrumb.Item key={index}>
              <Link to={i.path}>{i.name}</Link>
            </Breadcrumb.Item>
          );
        }
        return false
      })}
    </Breadcrumb>
  );
};
