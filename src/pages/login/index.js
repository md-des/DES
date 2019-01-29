import Link from 'umi/link';
import router from 'umi/router';
import React, { Component } from 'react';
import style from './login.less';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import kit from 'utils/kit.js'
const {encryptDES} = kit;
const img = require('static/images/logo.jpg');
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(values, 'values')
      const key = Math.random().toString(36).substr(2);
      const pass = encryptDES(values.password, key);
      console.log(pass, 'ppppp')
      router.push('/document/my')

    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className={style.loginPanel}>
          <div className={style.logoContainer}>
            <img src={img} alt="" style={{width: '60px', height: '60px'}}/>
          </div>
          <Form onSubmit={this.handleSubmit} className={style.form + ' login-form'}>
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
              <Button type="primary" htmlType="submit" className={style.loginBtn + " login-form-button"}>
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const LoginForm = Form.create({name: 'normal_login'})(Login);
export default LoginForm;