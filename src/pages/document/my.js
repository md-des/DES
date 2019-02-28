import React, { Component } from 'react';
import { List, Button, Input, message, Icon, Dropdown, Menu, Modal } from 'antd';
import { posts } from 'request';
import EditorOverview from 'components/EditorOverview';
import Editor from 'components/Editor';
const confirm = Modal.confirm;
export default class MyDoc extends Component {
  state = {};
  componentDidMount() {
    this.getPostsList();
  }
  getPostsList = () => {
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
  };
  getPostDetail = (id, idx) => {
    this.setState({
      currentHoverIndex: idx,
      currentClickedPostId: id,
    });
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
            edit: false,
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
    const { newContent, _id, title } = this.state;
    posts
      .updatePost({
        params: {
          _id,
          content: newContent,
          title,
        },
      })
      .then(req => {
        if (req && req.code === 1000) {
          const {
            data: { content, title },
          } = req;
          message.success('修改成功！');
          this.setState({
            edit: false,
            title,
            content,
          });
          this.getPostsList();
        }
      });
  };
  onMenuClick = ({ item, key, keyPath }) => {
    console.log({ item, key, keyPath }, '{ item, key, keyPath }');
    if (key === '3') {
      this.delete();
    }
  };
  delete = () => {
    const {currentClickedPostId} = this.state;
    const _this = this;
    if (!currentClickedPostId) {
      return;
    }
    confirm({
      title: '确定删除吗?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        posts
          .deletePost({
            params: {
              _id: currentClickedPostId,
            },
          })
          .then(res => {
            if (res.code === 1000) {
              message.success('删除成功！');
              _this.setState({

                content: ''
              });
              _this.getPostsList();
            }
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  render() {
    const { list, content, edit, title, currentHoverIndex } = this.state;
    const iframeContainer = document.getElementsByClassName('stackedit-iframe-container')[0];
    let width;
    if (iframeContainer) {
      width = iframeContainer.offsetWidth;
    }
    const menu = (
      <Menu onClick={this.onMenuClick}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd memu item</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">删除</Menu.Item>
      </Menu>
    );
    return (
      <div>
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
              renderItem={(item, idx) => (
                <List.Item>
                  <div style={{ width: '150px' }} onClick={() => this.getPostDetail(item._id, idx)}>
                    {item.title}
                  </div>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Icon
                      type="setting"
                      style={{
                        display: currentHoverIndex === idx ? 'block' : 'none',
                        lineHeight: '20px',
                      }}
                    />
                  </Dropdown>
                </List.Item>
              )}
            />
          </div>
          {!edit && (
            <div style={{ width: '100%', marginLeft: '40px', maxWidth: '1280px' }}>
              {content && <Button onClick={this.edit}>编辑</Button>}
              {content && <EditorOverview content={content} />}
            </div>
          )}
          {edit && content && (
            <div
              style={{
                width: width || '100%',
                height: '100%',
                backgroundColor: 'rgb(44, 44, 44)',
                maxWidth: '1280px',
              }}
            >
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
                value={content}
                style={{
                  top: '219px',
                  left: '448px',
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
