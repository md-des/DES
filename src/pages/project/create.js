import React, { Component } from 'react';
import { Form, Icon, Input, Select, Spin, Modal } from 'antd';
import { user, posts as postAjax } from 'request';
const Option = Select.Option;
class Create extends Component {
  state = {};
  handleSubmit = e => {
    const { createProject } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.members = values.members ? values.members.map(i => i.key) : [];
        values.posts = values.posts ? values.posts.map(i => i.key): [];
        createProject(values);
      }
    });
  };
  fetchUser = value => {
    this.setState({ data: [], fetching: true });
    user
      .search({
        params: {
          name: value,
        },
      })
      .then(res => {
        const { code, data } = res;
        if (code === 1000) {
          this.setState({
            data,
          });
        }
      });
  };
  handleChange = value => {
    this.setState({
      data: [],
      fetching: false,
    });
  };
  fetchPosts = value => {
    this.setState({posts: [], postsFetching: true});
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    postAjax
      .search({
        params: {
          author: userId,
          title: value,
        },
      })
      .then(res => {
        const { code, data } = res;
        if (code === 1000) {
          console.log(res, 'res')
          this.setState({
            posts: data,
          });
        }
      });
  };
  handlePostsChange = () => {
    this.setState({
      posts: [],
      postsFetching: false,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data = [], posts = [], fetching, postsFetching } = this.state;
    const { visible, onCancel } = this.props;
    return (
      <Modal title="创建书架" visible={visible} onOk={this.handleSubmit} onCancel={onCancel}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('group_name', {
              rules: [{ required: true, message: 'Please input your group_name!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="书架名"
              />
            )}
          </Form.Item>
          
          <Form.Item>
            {getFieldDecorator('members', {
              rules: [{ required: false, message: 'Please input members!' }],
            })(
              <Select
                mode="multiple"
                labelInValue
                placeholder="搜索以添加成员"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '100%' }}
              >
                {data.map(d => (
                  <Option key={d._id}>{d.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('posts', {
              rules: [{ required: false, message: '搜索以添加文章!' }],
            })(
              <Select
                mode="multiple"
                labelInValue
                placeholder="搜索以添加文章"
                notFoundContent={postsFetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchPosts}
                onChange={this.handlePostsChange}
                style={{ width: '100%' }}
              >
                {posts.map(d => (
                  <Option key={d._id}>{d.title}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Create);
