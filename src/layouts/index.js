import LoginLayout from './loginLayout/index';
import BaseLayout from './baseLayout/index';
import {sideList} from './sideList';
import router from 'umi/router';
function BasicLayout(props) {
  const newProps = {
    ...props,
    sideList,
  };
  if (props.location.pathname === '/login' || props.location.pathname === '/signup') {
    return <LoginLayout>{props.children}</LoginLayout>;
  }
  if (props.location.pathname === '/') {
    router.push('/login');
  }
  return <BaseLayout {...newProps}>{props.children}</BaseLayout>;
}

export default BasicLayout;
