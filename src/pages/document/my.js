import Link from 'umi/link';
import React, { Component } from 'react';
import { List } from 'antd';
import { posts } from 'request';
import EditorOverview from 'components/EditorOverview';
export default class MyDoc extends Component {
  state = {};
  componentDidMount() {
    posts
      .getList({
        params: {
          author: '5c4a6b17c81cb7496c3570f4',
        },
      })
      .then(req => {
        this.setState({
          list: req.data.docs,
        });
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
        const { data: { detail = '' } = {} } = req;
        this.setState({
          content: detail.content,
        });
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
