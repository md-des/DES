import React, { Component } from 'react';
import Stackedit from 'stackedit-js';
export default class EditorOverview extends Component {
  componentWillReceiveProps(newProps) {
    const el = document.getElementById('stackeditOverview');
    const panel = document.getElementById('stackeditOverviewPanel');

    const stackedit = new Stackedit();
    this.stackedit = stackedit;
    this.el = el;
    // Open the iframe
    stackedit.openFile({
      name: 'stackeditOverview',
      content: { text: newProps.content }
    }, true);
    
    // In silent mode, the `fileChange` event is emitted only once.
    stackedit.on('fileChange', (file) => {
      panel.innerHTML = file.content.html;
    });
  }
  render() {
    return (
      <div>
        <textarea style={{display: 'none'}} id="stackeditOverview" />
        <div id="stackeditOverviewPanel">

        </div>
      </div>
    )
  }
}