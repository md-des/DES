import React, { Component } from 'react';
import { Card, Icon, message } from 'antd';
import { projects } from 'request';
import style from './index.less';
import router from 'umi/router';
import { connect } from 'dva';
import Create from './create';
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
          creator_id: userId,
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
  myProjects = my => {
    return my.map(m => {
      return (
        <Card
          key={m._id}
          title={m.group_name}
          className={style.card}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          onClick={() => this.getProjectDetail(m._id)}
          extra={<span>创建者：{m.creator_name}</span>}
        >
          <p>成员：{m.members.length === 0 && '暂无'}</p>
          {m.members.map((p, idx) => {
            return <p key={idx}>{p.name}</p>;
          })}
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
          className={style.card}
          onClick={() => this.getProjectDetail(m._id)}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          extra={<span>创建者：{m.creator_name}</span>}
        >
          <p>成员：{m.members.length === 0 && '暂无'}</p>
          {m.members.map((p, idx) => {
            return <p key={idx}>{p.name}</p>;
          })}
        </Card>
      );
    });
  };
  createProject = values => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    projects
      .createProject({
        params: {
          creator_id: userId,
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
  render() {
    const { my, participant, detail } = this.state;
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
      </div>
    );
  }
}

export default connect(state => ({}))(AllProjects);
