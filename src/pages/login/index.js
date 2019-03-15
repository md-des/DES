import Link from 'umi/link';
import router from 'umi/router';
import React, { Component } from 'react';
import style from './login.less';
import {Form, Icon, Input, Button, Checkbox, message, Avatar} from 'antd';
import kit from 'utils/kit.js'
import {user} from 'request';
import { connect } from 'dva';
const {encryptDES} = kit;

const img = require('static/images/md.jpg');
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const {userName, password} = values;
      const key = 'DES';
      const pass = encryptDES(password, key);
      user.loginIn({
        params: {
          name: userName,
          pass
        }
      }).then(req => {
        if (req && req.code === 1000) {
          const {user} = req.data;
          message.success('登录成功！');
          dispatch({
            type: 'userInfo/updateUserInfo',
            payload: {
              user
            }
          });
          router.push('/document/my');
        }
      })
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {user = {}} = this.props;
    return (
      <div>
        <div className={style.loginPanel}>
          <div className={style.logoContainer}>
            <Avatar size={80} icon="user" src={user.avatar && '/api/' + user.avatar} />
          </div>
          <Form  className={style.form + ' login-form'}>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <br/>
              <Button type="primary" onClick={this.handleSubmit} className={style.loginBtn + " login-form-button"}>
                Log in
              </Button>
              Or <Link to="/signup" style={{color: 'rgb(49, 48, 56)'}}>register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const LoginForm = Form.create({name: 'normal_login'})(Login);
export default connect(state => ({
  detail: state.projects_all.detail,
  user: state.userInfo.user
}))(LoginForm);