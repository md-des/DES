import React, { Component } from 'react';
import { List } from 'antd';
import { posts } from 'request';
import EditorOverview from 'components/EditorOverview';
export default class MyDoc extends Component {
  state = {};
  componentDidMount() {
    const userId = localStorage.getItem('userId')
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
          const {data: {detail = ''} = {}} = req;
          this.setState({
            content: detail.content,
          });
        }
      });
  };
  render() {
    const { list, content } = this.state;
    return (
      <div>
        <h2>我的文档</h2>
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
          <div style={{width: '100%', marginLeft: '40px', maxWidth: '800px'}}>
            <EditorOverview content={content} />
          </div>
        </div>
      </div>
    );
  }
}
