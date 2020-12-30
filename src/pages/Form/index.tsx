import { Form, Input, Button, Select, Space, Checkbox, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  getTagList,
  putDocument,
  InterfaceTag,
  InterfaceDocument,
  InterfaceRequestList
} from '@services/document';
import 'antd/dist/antd.min.css';
import './index.scss';

interface InterfaceRequestItemProps {
  field: {
    key: number
    name: number
    fieldKey: number
  }
  key: number
  remove: (key: number) => void
}

const { Item, List } = Form;
const { Option } = Select;

const ruleRequired = (message?: string): object => ({ required: true, message });
const defaultParam: InterfaceRequestList = {
  title: '',
  type: '',
  require: false,
  defaultValue: '',
  content: ''
};

const RequestItem = (props: InterfaceRequestItemProps) => {
  const { field, key, remove } = props
  const layoutList = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  return (
    <div key={field.key} className="add-box">
      <Space align="baseline">
        <Item
          {...layoutList}
          {...field}
          name={[field.name, 'title']}
          label="参数"
          fieldKey={[field.fieldKey, 'title']}
          rules={[ruleRequired('参数不可为空')]}
        >
          <Input></Input>
        </Item>
      </Space>
      <Space align="baseline">
        <Item
          {...layoutList}
          {...field}
          name={[field.name, 'type']}
          label="类型"
          fieldKey={[field.fieldKey, 'type']}
          rules={[ruleRequired('类型不可为空')]}
        >
          <Input></Input>
        </Item>
      </Space>
      <Space align="baseline">
        <Item
          {...layoutList}
          {...field}
          name={[field.name, 'defaultValue']}
          label="默认值"
          fieldKey={[field.fieldKey, 'defaultValue']}
        >
          <Input></Input>
        </Item>
      </Space>
      <Space align="baseline">
        <Item
          {...layoutList}
          {...field}
          name={[field.name, 'content']}
          label="备注"
          fieldKey={[field.fieldKey, 'content']}
        >
          <Input></Input>
        </Item>
      </Space>
      <Space className="checkbox" align="baseline">
        <Item
          colon={false}
          {...field}
          name={[field.name, 'require']}
          valuePropName="checked"
          label=" "
          fieldKey={[field.fieldKey, 'require']}
        >
          <Checkbox>是否必填</Checkbox>
        </Item>
      </Space>
      <Space align="baseline">
        <Item
          colon={false}
          {...field}
        >
          <MinusCircleOutlined className="btn-delete" onClick={() => remove(key)}></MinusCircleOutlined>
        </Item>
      </Space>
    </div>
  )
}
const RequestList: React.FC = () => {
  return (
    <List name="requestList">
      { (fields, { add, remove }) => {
        return (
          <React.Fragment>
            <div className="request-params">请求参数：</div>
            {
              fields.map((field, index) => (
                <RequestItem field={field} key={index} remove={remove}></RequestItem>
              ))
            }
            <Item className="btn-add">
              <Button type="dashed" block onClick={() => add(defaultParam)} icon={<PlusOutlined/>}>新增</Button>
            </Item>
          </React.Fragment>
        )
      }}
    </List>
  )
}

const FormComponent = () => {
  const [form] = Form.useForm();
  const [tagList, updateTagList] = useState<InterfaceTag[]>([]);

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async (values:InterfaceDocument) => {
    console.log('onFinish', values);
    const { success } = await putDocument(values);
    if (success) {
      notification.success({
        message: '提交成功'
      });
      onReset()
    };
  };
  const fetchTagList = async () => {
    const params = {
      page: 1,
      size: 50
    }
    const { success, data } = await getTagList(params);
    if (success) {
      const { list = [] } = data
      updateTagList(list);
    }
  };

  useEffect(() => {
    fetchTagList();
  }, []);

  return (
    <Form className="form form-page" form={form} onFinish={onFinish}>
      <Item name="title" label="标题" rules={[ruleRequired('标题不可为空')]}>
        <Input placeholder="请输入标题"></Input>
      </Item>
      <Item name="url" label="url" rules={[ruleRequired('url不可为空')]}>
        <Input placeholder="请输入url"></Input>
      </Item>
      <Item name="method" label="请求方式" rules={[ruleRequired('请求方式不可为空')]}>
        <Select className="select" placeholder="请选择一种请求方式">
          <Option value={1}>GET</Option>
          <Option value={2}>POST</Option>
          <Option value={3}>PUT</Option>
          <Option value={4}>DELETE</Option>
        </Select>
      </Item>
      <Item name="tag" label="关联版本" rules={[ruleRequired('请求方式不可为空')]}>
        <Select className="select" placeholder="请选择一种版本">
          { tagList.map((el) => (<Option key={el._id} value={el._id}>{el.name}</Option>)) }
        </Select>
      </Item>
      <RequestList></RequestList>
      <Item name="responseSuccess" label="成功响应" rules={[ruleRequired('成功响应不可为空')]}>
        <Input.TextArea rows={4} placeholder="请输入成功响应"></Input.TextArea>
      </Item>
      <Item name="responseError" label="失败响应">
        <Input.TextArea rows={4} placeholder="请输入失败响应"></Input.TextArea>
      </Item>
      <Item className="btn">
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button onClick={onReset}>重置</Button>
      </Item>
    </Form>
  );
};

export default FormComponent;
