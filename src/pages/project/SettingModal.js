import React, { Component } from 'react';
import { Form, Icon, Input, Select, Spin, Modal } from 'antd';
import { user, posts as postAjax } from 'request';
const Option = Select.Option;
class SettingModal extends Component {
  state = {}
  componentDidMount() {
    
  }
  handleSubmit = () => {}
  fetchData = (val) => {
    const {request, id, params, searchKey} = this.props;
    request({
      params: {
        ...params,
        [searchKey]: val
      }
    }).then(res => {
      console.log(res, 'ressss')
      const {data, code} = res;
      if (code === 1000) {
        this.setState({
          data
        })
      }
    })
  }
  handleChange = (e) => {
    
  }
  handleSubmit = e => {
    e.preventDefault();
    const {submit} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        submit(values)
      }
    });
    
  };
  render() {
    const {title, visiable, onOk, onCancel, form: {getFieldDecorator}, searchKey} = this.props;
    const {data = [], fetching} = this.state;
    return (
      <Modal
          title={title}
          visible={visiable}
          onOk={this.handleSubmit}
          onCancel={onCancel}
        >
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator('searchData', {
                rules: [{ required: true, message: 'Please enter the search content' }],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  placeholder="搜索以添加"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchData}
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                >
                  {data.map(d => (
                    <Option key={d._id}>{d[searchKey]}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
    )
  }
}
export default Form.create()(SettingModal);