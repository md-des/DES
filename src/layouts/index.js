import LoginLayout from './loginLayout/index';
import BaseLayout from './baseLayout/index';
import {sideList} from './sideList'
function BasicLayout(props) {
  const newProps = {
    ...props,
    sideList,
  };
  if (props.location.pathname === '/login') {
    return <LoginLayout>{props.children}</LoginLayout>;
  }
  return <BaseLayout {...newProps}>{props.children}</BaseLayout>;
}

export default BasicLayout;
