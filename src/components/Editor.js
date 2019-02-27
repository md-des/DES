import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite'
export default class Editor extends Component {
  state = {
    value: ''
  }
  componentDidMount() {
    const {value} = this.props;
    this.setState({
      value
    })
  }
  handleEditorChange  = ({html, text}) => {
    this.props.getContent(text);
    this.setState({
      value: text
    })
  }
  render() {
    const {value} = this.state;
    return (
      <div className={"stackedit_contener"}>
        <MdEditor
          value={value}
          style={{height: window.innerHeight - 191 + 'px'}}
          onChange={this.handleEditorChange} 
        />  
      </div>
    );
  }
}
