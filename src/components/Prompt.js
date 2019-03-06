import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
import ReactDom from 'react-dom';
class P extends Component {
  state = {
    visible: true,
  };
  close = () => {
    const { removeDom } = this.props;
    this.setState(
      {
        visible: false,
      },
      () => {
        removeDom();
      }
    );
  };
  onCancel = () => {
    const { onCancel } = this.props;
    this.close();
    onCancel && onCancel();
  };
  onOk = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.close();
        onOk && onOk(values);
      }
    });
  };
  render() {
    const {
      title,
      placeHolder,
      form: { getFieldDecorator },
    } = this.props;
    const { visible } = this.state;
    return (
      <Modal title={title} visible={visible} onOk={this.onOk} onCancel={this.onCancel}>
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('text', {
              rules: [{ required: true, message: 'input required!' }],
            })(<Input placeholder={placeHolder} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const Dom = Form.create()(P);

export default function Prompt(options) {
  let container = document.createElement('div');
  const removeDom = () => {
    ReactDom.unmountComponentAtNode(container);
  };
  ReactDom.render(<Dom {...options} removeDom={removeDom} />, container);
}
