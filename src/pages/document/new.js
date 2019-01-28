import React, { Component } from 'react';
import Editor from 'components/Editor';
import { Button, Input, message } from 'antd';
import { posts } from 'request';
export default class NewPost extends Component {
  state = {};
  setTitle = e => {
    const title = e.target.value;
    this.setState({
      title,
    });
  };
  savePost = () => {
    const { title, content } = this.state;
    posts.createPost({
      params: {
        author: '5c4a6b17c81cb7496c3570f4',
        title,
        content,
      },
    }).then((req) => {
      if (req.code === 1000) {
        message.success('新建成功！')
      }
    });
  };
  getContent = (content) => {
    this.setState({
      content
    })
  }
  render() {
    const { title } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', height: '32px', lineHeight: '32px' }}>
          <div style={{ width: '60px', color: '#fff' }}>标题：</div>
          <Input onChange={this.setTitle} value={title} />
          <Button style={{ marginLeft: '20px' }} onClick={this.savePost}>
            保存
          </Button>
        </div>
        <Editor getContent={this.getContent} />
      </div>
    );
  }
}