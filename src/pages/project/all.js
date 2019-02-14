import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import { projects } from 'request';
import style from './index.less';
import router from 'umi/router';
import {connect} from 'dva';
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
    const {dispatch} = this.props;
    projects
      .getProjectsDetail({
        params: {
          _id,
        },
      })
      .then(req => {
        if (req) {
          const {data} = req;
          if (data) {
            dispatch({
              type: 'projects_all/updateState',
              payload: {
                detail: data
              }
            })
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
          <p>成员：{m.members.length == 0 && '暂无'}</p>
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
          <p>成员：{m.members.length == 0 && '暂无'}</p>
          {m.members.map((p, idx) => {
            return <p key={idx}>{p.name}</p>;
          })}
        </Card>
      );
    });
  };

  render() {
    const { my, participant, detail } = this.state;
    return (
      <div className={style.cardContinerWarp}>
        <h3>我创建的项目</h3>
        <div className={style.cardContent}>{this.myProjects(my)}</div>
        <h3>我参与的项目</h3>
        <div className={style.cardContent}>{this.participantProjects(participant)}</div>
        {/* <div>
          <Detail detail={detail}/>
        </div> */}
      </div>
    );
  }
}

export default connect(state => ({}))(AllProjects);