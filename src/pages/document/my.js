import Link from 'umi/link';
import React, { Component } from 'react';
import {List} from 'antd';
import { posts } from 'request';
export default class MyDoc extends Component {
  state = {
    list: [
      {title: '123'},
      {title: '123'},
      {title: '123'},
      {title: '123'},
    ]
  }
  componentDidMount() {
    posts.getList({
      params: {
        author: '5c4a6b17c81cb7496c3570f4'
      }
    }).then(req => {
      this.setState({
        list: req.data.docs
      })
    })
  }
  render() {
    const {list} = this.state;
    return (
      <div>
        <h1>我的文档</h1>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '200px' }}>
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <div>{item.title}</div>
                  <div>{'content is xxx...'}</div>
                </List.Item>
              )}
            />
          </div>
          <div />
        </div>
      </div>
    );
  }
}
