import React, { Component } from 'react';
import Stackedit from 'stackedit-js';
export default class Editor extends Component {
  componentDidMount() {
    const el = document.getElementById('stackedit');

    const stackedit = new Stackedit();
    this.stackedit = stackedit;
    this.el = el;
    // Open the iframe
    this.openIframe();
    // Listen to StackEdit events and apply the changes to the textarea.
    stackedit.on('fileChange', file => {
      console.log('in', file.content.text)
      el.value = file.content.text;
    });
    stackedit.on('close', () => {
      console.log('close', el.value)
    });
  }
  componentWillUnmount() {
    this.closeIframe()
  }
  openIframe = () => {
    // Open the iframe
    this.stackedit.openFile({
      name: 'Filename', // with an optional filename
      content: {
        text: this.el.value, // and the Markdown content.
      },
    });
    const container = document.getElementsByClassName('stackedit-container')[0];
    const colseBtn = document.getElementsByClassName('navigation-bar__button')[0];
    if (container) {
      container.style.top = '180px';
      container.style.left = '212px';
      container.style.right = '12px';
      container.style.backgroundColor = 'rgba(0,0,0,0)';
    }
    if (colseBtn) {
      colseBtn.style.display = 'none'
    }
  };
  closeIframe = () => {
    this.stackedit.close()
  }
  render() {
    return (
      <div>
        <textarea style={{ display: 'none' }} id="stackedit" />
      </div>
    );
  }
}
