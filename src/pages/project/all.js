import React, { Component } from 'react';
import { Card, Icon, message, Dropdown, Menu, Modal } from 'antd';
import { projects, user as userAjax, posts as postAjax } from 'request';
import style from './index.less';
import router from 'umi/router';
import { connect } from 'dva';
import Create from './create';
import Prompt from 'components/Prompt.js';
import SettingModal from './SettingModal';
const confirm = Modal.confirm;
class AllProjects extends Component {
  state = {
    my: [],
    participant: [],
  };
  componentDidMount() {
    this.getProjectList();
  }
  getProjectList = () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    projects
      .getProjectsList({
        params: {
          creator: userId,
        },
      })
      .then(req => {
        if (req && req.data) {
          const { my, participant } = req.data;
          this.setState({
            my,
            participant,
          });
        }
      });
  };
  getProjectDetail = _id => {
    const { dispatch } = this.props;
    projects
      .getProjectsDetail({
        params: {
          _id,
        },
      })
      .then(req => {
        if (req) {
          const { data } = req;
          if (data) {
            dispatch({
              type: 'projects_all/updateState',
              payload: {
                detail: data,
              },
            });
            router.push('/project/detail');
          }
        }
      });
  };
  delete = id => {
    const _this = this;
    if (!id) {
      return;
    }
    confirm({
      title: '确定删除吗?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        projects
          .deleteProject({
            params: {
              _id: id,
            },
          })
          .then(res => {
            if (res.code === 1000) {
              message.success('删除成功！');
              _this.getProjectList();
            }
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  rename = id => {
    Prompt({
      title: '重命名',
      placeHolder: '请填写名称',
      onOk: ({ text }) => {
        projects
          .renameProject({
            params: {
              _id: id,
              name: text,
            },
          })
          .then(res => {
            if (res.code === 1000) {
              message.success('操作成功！');
              this.getProjectList();
            }
          });
      },
    });
  };
  onMenuClick = ({ key }, id) => {
    if (key === '0') {
      this.delete(id);
    }
    if (key === '1') {
      this.rename(id);
    }
    if (key === '2') {
      this.openSettingModal('addPostVisiable');
    }
    if (key === '3') {
      this.openSettingModal('addMemberVisiable');
    }
    this.setState({currentProjectId: id})
  };
  openSettingModal = key => {
    this.setState({
      [key]: true,
    });
  };
  closeSettingModal = key => {
    this.setState({
      [key]: false,
    });
  };
  menu1 = id => (
    <Menu onClick={params => this.onMenuClick(params, id)}>
      <Menu.Item key="1">重命名</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="0">删除</Menu.Item>
    </Menu>
  );
  menu2 = id => (
    <Menu onClick={params => this.onMenuClick(params, id)}>
      <Menu.Item key="2">加入文章</Menu.Item>
      <Menu.Item key="3">加入成员</Menu.Item>
    </Menu>
  );
  myProjects = my => {
    return my.map(m => {
      return (
        <Card
          key={m._id}
          title={
            <span title={m.group_name} onClick={() => this.getProjectDetail(m._id)}>
              {m.group_name}
            </span>
          }
          className={style.card}
          hoverable={true}
          actions={[
            <Dropdown overlay={() => this.menu1(m._id)} trigger={['click']}>
              <Icon type="setting" />
            </Dropdown>,
            <Dropdown overlay={() => this.menu2(m._id)} trigger={['click']}>
              <Icon type="ellipsis" />
            </Dropdown>,
          ]}
          extra={<span>创建者：{m.creator.name}</span>}
        >
          <p className={style.p}>成员：{m.members.length === 0 && '暂无'}</p>
          {m.members.map((p, idx) => {
            return (
              <p className={style.p} key={idx}>
                {p.name}
              </p>
            );
          })}
          <p style={{ margin: '0 5px' }}>文章数：{m.posts.length} 篇</p>
        </Card>
      );
    });
  };
  participantProjects = participant => {
    return participant.map(m => {
      return (
        <Card
          title={m.group_name}
          key={m._id}
          hoverable={true}
          className={style.card}
          onClick={() => this.getProjectDetail(m._id)}
          // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          extra={<span>创建者：{m.creator.name}</span>}
        >
          <p className={style.p}>成员：{m.members.length === 0 && '暂无'}</p>
          {m.members.map((p, idx) => {
            return (
              <p className={style.p} key={idx}>
                {p.name}
              </p>
            );
          })}
          <p style={{ margin: '0 5px' }}>文章数：{m.posts.length} 篇</p>
        </Card>
      );
    });
  };
  createProject = values => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    projects
      .createProject({
        params: {
          creator: userId,
          ...values,
        },
      })
      .then(res => {
        if (res.code === 1000) {
          message.success('新建成功！');
          this.closeModel();
          this.getProjectList();
        }
      });
  };
  openModel = () => {
    this.setState({
      visible: true,
    });
  };
  closeModel = () => {
    this.setState({
      visible: false,
    });
  };

  onAddPostSubmit = ({searchData}) => {
    this.updateProject('posts', searchData)
    this.closeSettingModal('addPostVisiable')
  }
  onAddMemberSubmit = ({searchData}) => {
    this.updateProject('members', searchData)
    this.closeSettingModal('addMemberVisiable')
  }
  updateProject = (key, searchData) => {
    const {currentProjectId} = this.state;
    projects.updateProject({
      params: {
        _id: currentProjectId,
        [key]: searchData.map(i => i.key)
      }
    }).then(res => {
      message.success('添加成功！');
      this.getProjectList()
    })
  }
  render() {
    const { my, participant, addPostVisiable, addMemberVisiable } = this.state;
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    return (
      <div className={style.cardContinerWarp}>
        <h3>我创建的</h3>
        <div className={style.cardContent}>
          {this.myProjects(my)}
          <div
            key={'new'}
            className={style.card}
            style={{ border: '1px solid #e8e8e8', cursor: 'pointer' }}
            onClick={this.openModel}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Icon
                type="plus"
                style={{
                  fontSize: '36px',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                }}
              />
            </div>
          </div>
        </div>

        <h3>我参与的</h3>
        <div className={style.cardContent}>{this.participantProjects(participant)}</div>
        <Create
          visible={this.state.visible}
          createProject={this.createProject}
          onCancel={this.closeModel}
        />
        <SettingModal
          title={'添加文章'}
          visiable={addPostVisiable}
          request={postAjax.search}
          params={{author: userId}}
          searchKey={'title'}
          submit={this.onAddPostSubmit}
          onCancel={() => this.closeSettingModal('addPostVisiable')}
        />
        <SettingModal
          title={'添加成员'}
          visiable={addMemberVisiable}
          request={userAjax.search}
          searchKey={'name'}
          submit={this.onAddMemberSubmit}
          onCancel={() => this.closeSettingModal('addMemberVisiable')}
        />
      </div>
    );
  }
}
export default connect(state => ({}))(AllProjects);
