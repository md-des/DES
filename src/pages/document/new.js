import React, { Component } from 'react';
import Editor from 'components/Editor';
import { Button, Input, message } from 'antd';
import {posts} from 'request';
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
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    if (!title) {
      message.warning('请输入文章标题')
    } else {
      posts
        .createPost({
          params: {
            author: userId,
            title,
            content,
          },
        })
        .then(req => {
          if (req.code === 1000) {
            message.success('新建成功！');
            // router.push('/document/my')
          }
        });
    }
  };
  getContent = content => {
    this.setState({
      content,
    });
  };
  render() {
    const {title} = this.state;
    const iframeContainer = document.getElementsByClassName('stackedit-iframe-container')[0];
    let width;
    if (iframeContainer) {
      width = iframeContainer.offsetWidth;
    }
    return (
      <div
        style={{
          width: width || '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '52px',
            lineHeight: '32px',
            padding: '10px',
            background: 'rgb(44, 44, 44)',
          }}
        >
          <div style={{ width: '60px', color: '#fff' }}>标题：</div>
          <Input onChange={this.setTitle} value={title} />
          <Button style={{ marginLeft: '20px' }} onClick={this.savePost}>
            保存
          </Button>
        </div>
        <Editor
          getContent={this.getContent}
          style={{ top: '180px', left: '224px', right: '12px', backgroundColor: 'rgba(0,0,0,0)' }}
        />
      </div>
    );
  }
}
