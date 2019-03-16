import Link from 'umi/link';
import router from 'umi/router';
import React, { Component } from 'react';
import style from './signup.less';
import {Form, Icon, Input, Button, message, Avatar} from 'antd';
import kit from 'utils/kit.js'
import { user } from 'request';
const {encryptDES} = kit;
class Signup extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const {userName, password} = values;
      const key = 'DES';
      const pass = encryptDES(password, key);
      user.signup({
        params: {
          name: userName,
          pass
        }
      }).then(req => {
        if (req.code === 1000) {
          message.success('注册成功！');
          router.push('/login')
        }
      })
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className={style.loginPanel}>
          <div className={style.logoContainer}>
            <Avatar size={80} icon="user" />
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
              {getFieldDecorator('passwordConfirm', {
                rules: [
                  {required: true, message: 'Please confirm your password!'},
                  {validator: this.compareToFirstPassword}
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="confirm your password!"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={style.loginBtn + " login-form-button"}>
                Sign Up
              </Button>
              <Link to="/login" style={{color: 'rgb(49, 48, 56)'}}>To log in</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const SignupForm = Form.create({name: 'normal_signup'})(Signup);
export default SignupForm;