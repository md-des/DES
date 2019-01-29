import React, { Component } from 'react';
import { List, Button, Input, message } from 'antd';
import { posts } from 'request';
import EditorOverview from 'components/EditorOverview';
import Editor from 'components/Editor';
export default class MyDoc extends Component {
  state = {};
  componentDidMount() {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    posts
      .getList({
        params: {
          author: userId,
        },
      })
      .then(req => {
        if (req && req.data) {
          this.setState({
            list: req.data.docs,
          });
        }
      });
  }
  getPostDetail = id => {
    posts
      .getPostDetail({
        params: {
          id,
        },
      })
      .then(req => {
        if (req) {
          const { data: { detail = {} } = {} } = req;
          this.setState({
            content: detail.content,
            title: detail.title,
            _id: detail._id,
          });
        }
      });
  };
  edit = () => {
    this.setState({ edit: true });
  };
  getContent = content => {
    this.setState({
      newContent: content,
    });
  };
  setTitle = e => {
    const val = e.target.value;
    this.setState({ title: val });
  };
  savePost = () => {
    const {newContent, _id, title} = this.state;
    posts.updatePost({
      params: {
        _id,
        content: newContent,
        title
      }
    }).then(req => {
      if (req && req.code === 1000) {
        message.success('修改成功！')
      }
    })
  };
  render() {
    const { list, content, edit, title } = this.state;
    return (
      <div>
        {/* <h2>我的文档</h2> */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '200px',
              minWidth: '200px',
              borderRight: '1px solid #eee',
              paddingRight: '20px',
              cursor: 'pointer',
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={item => (
                <List.Item onClick={() => this.getPostDetail(item._id)}>
                  <div>{item.title}</div>
                </List.Item>
              )}
            />
          </div>
          {!edit && (
            <div style={{ width: '100%', marginLeft: '40px', maxWidth: '800px' }}>
              {content && <Button onClick={this.edit}>编辑</Button>}
              <EditorOverview content={content} />
            </div>
          )}
          {edit && (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'rgb(44, 44, 44)' }}>
              <div
                style={{ display: 'flex', height: '32px', lineHeight: '32px', margin: '30px 10px' }}
              >
                <div style={{ width: '60px', color: '#fff' }}>标题：</div>
                <Input onChange={this.setTitle} value={title} />
                <Button style={{ marginLeft: '20px' }} onClick={this.savePost}>
                  保存
                </Button>
              </div>
              <Editor
                getContent={this.getContent}
                defaultValue={content}
                style={{
                  top: '219px',
                  left: '438px',
                  right: '38px',
                  backgroundColor: 'rgba(0,0,0,0)',
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
