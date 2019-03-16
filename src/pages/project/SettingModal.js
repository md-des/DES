import React, { Component } from 'react';
import { Form, Select, Spin, Modal } from 'antd';
const Option = Select.Option;
class SettingModal extends Component {
  state = {}
  componentDidMount() {
    
  }
  handleSubmit = () => {}
  fetchData = (val) => {
    const {request, params, searchKey} = this.props;
    request({
      params: {
        ...params,
        [searchKey]: val
      }
    }).then(res => {
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
    const {title, visiable, onCancel, form: {getFieldDecorator}, searchKey} = this.props;
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