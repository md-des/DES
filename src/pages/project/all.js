import React, { Component } from 'react';
import { List, Button, Input, message, Card, Icon } from 'antd';
import { projects } from 'request';
import style from './index.less';
export default class AllProjects extends Component {
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
          console.log(req.data, 'dddd');
          const { my, participant } = req.data;
          this.setState({
            my,
            participant,
          });
        }
      });
  };
  getProjectDetail = id => {
    projects
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
  myProjects = my => {
    return my.map(m => {
      return (
        <Card
          key={m._id}
          title={m.group_name}
          className={style.card}
          // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          extra={<span>创建者：{m.creator_name}</span>}
        >
          {m.posts.map((p, idx) => {
            return <p key={idx}>{p.title}</p>;
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
          // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          extra={<span>创建者：{m.creator_name}</span>}
        >
          {m.posts.map((p, idx) => {
            return <p key={idx}>{p.title}</p>;
          })}
        </Card>
      );
    });
  };

  render() {
    const { my, participant } = this.state;
    return (
      <div className={style.cardContinerWarp}>
        <h3>我创建的项目</h3>
        <div className={style.cardContent}>{this.myProjects(my)}</div>
        <h3>我参与的项目</h3>
        <div className={style.cardContent}>{this.participantProjects(participant)}</div>
      </div>
    );
  }
}
