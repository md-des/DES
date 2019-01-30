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
      this.props.getContent(file.content.text)
      el.value = file.content.text;
    });
    stackedit.on('close', () => {
      // console.log('close', el.value)
    });
  }
  componentWillUnmount() {
    this.closeIframe()
  }
  openIframe = () => {
    const {style: {top, left, right, backgroundColor}, defaultValue} = this.props;
    // Open the iframe
    this.stackedit.openFile({
      name: 'editor', // with an optional filename
      content: {
        text: defaultValue || this.el.value, // and the Markdown content.
      },
    });
    const container = document.getElementsByClassName('stackedit-container')[0];
    // const iframe = document.getElementsByClassName('stackedit-iframe')[0];
    const colseBtn = document.getElementsByClassName('navigation-bar__button')[0];
    if (container) {
      container.style.top = top;
      container.style.left = left;
      container.style.right = right;
      container.style.backgroundColor = backgroundColor;
    }
    // console.log(iframe.contentWindow, 'frame')
    // const iframeDocument = iframe.contentWindow.document;
    // const nav = iframeDocument.getElementsByTagName('nav')
    // console.log(iframeDocument, 'iframeDocument')
    if (colseBtn) {
      colseBtn.style.display = 'none'
    }
  };
  closeIframe = () => {
    this.stackedit.close()
  }
  render() {
    return (
      <div className={"stackedit_contener"}>
        <textarea style={{ display: 'none' }} id="stackedit" />
      </div>
    );
  }
}
