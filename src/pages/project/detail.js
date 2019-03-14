import React, { Component } from 'react';
import { List, Button, Input, message } from 'antd';
import { posts } from 'request';
import EditorOverview from 'components/EditorOverview';
import Editor from 'components/Editor';
import {connect} from 'dva';
class ProjectDetail extends Component {
  state = {}
  componentWillMount() {
    const {detail} = this.props;
    this.setState({
      detail
    })
  }
  componentWillReceiveProps(nextProps) {
    const {detail} = nextProps;
    this.setState({
      detail
    })
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
            edit: false,
            content: detail.content,
            title: detail.title,
            _id: detail._id,
          });
        }
      });
  };
  updatePostsList = () => {
    const {detail, title, _id} = this.state;
    const posts = detail.posts.slice(0);
    posts.forEach(i => {
      if (i._id === _id) {
        i.title = title;
      }
    })
    detail.posts = posts;
    this.setState({
      detail
    })
  }
  edit = () => {
    this.setState({ edit: true });
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
          const {data: {content, title}} = req;
          message.success('修改成功！');
          this.setState({
            edit: false,
            title,
            content
          });
          this.updatePostsList();
        }
      });
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
  render() {
    const {content, edit, title, detail = {} } = this.state;
    const iframeContainer = document.getElementsByClassName('stackedit-iframe-container')[0];
    let width;
    if (iframeContainer) {
      width = iframeContainer.offsetWidth;
    }
    return (
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
            dataSource={detail.posts}
            renderItem={item => (
              <List.Item onClick={() => this.getPostDetail(item._id)}>
                <div>{item.title}</div>
              </List.Item>
            )}
          />
        </div>
        {!edit && (
          <div style={{ width: '100%', marginLeft: '40px', maxWidth: '1280px' }}>
            {content && <Button onClick={this.edit} style={{margin: '10px 0'}}>编辑</Button>}
            {content && <EditorOverview content={content} />}
          </div>
        )}
        {edit && (
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
    );
  }
}
export default connect(state => ({
  detail: state.projects_all.detail
}))(ProjectDetail);