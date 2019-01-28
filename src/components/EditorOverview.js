import React, {Component} from 'react';
import { Spin, Icon } from 'antd';
import Stackedit from 'stackedit-js';
export default class EditorOverview extends Component {
  state = {}
  componentWillReceiveProps(newProps) {
    this.setState({loading: false})
    const _this = this;
    if (newProps.content) {
      const el = document.getElementById('stackeditOverview');
      const panel = document.getElementById('stackeditOverviewPanel');

      const stackedit = new Stackedit();
      this.stackedit = stackedit;
      this.el = el;
      // Open the iframe
      stackedit.openFile({
        name: 'stackeditOverview',
        content: {text: newProps.content}
      }, true);
      this.setState({loading: true})
      // In silent mode, the `fileChange` event is emitted only once.
      stackedit.on('fileChange', (file) => {
        panel.innerHTML = file.content.html;
        _this.setState({loading: false})
      });
    }
  }
  render() {
    const {loading} = this.state;
    const {content} = this.props;
    return (
      <div>
        <div style={{width: '100%', maxWidth: '800px', textAlign: 'center'}}>
              <Spin spinning={loading === true}/>
        </div>
        <textarea style={{display: 'none'}} id="stackeditOverview" />
        <div id="stackeditOverviewPanel" style={{background: loading && 'rgba(0,0,0,0.05)'}} />
        {!content &&
          <div style={{width: '100%', maxWidth: '800px', textAlign: 'center'}}>
          <Icon type="read" style={{fontSize: '50px'}}/>
          </div>
        }
      </div>
    )
  }
}