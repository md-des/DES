import React, { Component } from 'react';
import { Spin, Icon, BackTop } from 'antd';
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
export default class EditorOverview extends Component {
  state = {};
  componentDidMount() {
    const { content } = this.props;
    var result = md.render(content);
    this.insetcontent(result);
  }
  insetcontent = content => {
    this.setState({
      htmlcontent: content,
    });
  };
  componentWillReceiveProps(newProps) {
    const { content } = newProps;
    const result = md.render(content);
    this.insetcontent(result);
  }
  render() {
    const { loading, htmlcontent = '' } = this.state;
    const { content } = this.props;
    return (
      <div
        id="editorOverview"
        style={{
          height: window.innerHeight - 200 + 'px',
          overflow: 'auto',
          borderBottom: '1px solid #d8d8d8',
          borderTop: '1px solid #d8d8d8',
          boxShadow: '0px 8px 10px -10px #d8d8d8'
        }}
      >
        <BackTop target={() => document.getElementById('editorOverview')} />
        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <Spin spinning={loading === true} />
        </div>
        <div style={{ background: loading && 'rgba(0,0,0,0.05)' }} />
        {!content && (
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
            <p>暂无内容</p>
            <Icon type="read" style={{ fontSize: '50px' }} />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: htmlcontent }} />
      </div>
    );
  }
}
