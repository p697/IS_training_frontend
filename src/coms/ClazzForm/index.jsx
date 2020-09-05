import React, { useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Radio, message, Col, Row, Drawer, Button, Select } from 'antd';

import { get } from '../../utils/request'
import "./index.less"

const moment = require('moment');
const { Option } = Select;

export default (props) => {
  const { formData, setFormData, setQueryData } = props
  formData.setupDate = moment(formData.setupDate)
  const [clazzForm] = Form.useForm();

  useEffect(() => {
    clazzForm.setFieldsValue(formData)
  }, [formData, clazzForm])

  const handleFinish = () => {
    const submitInfo = clazzForm.getFieldsValue()
    submitInfo.id = formData.id
    submitInfo.setupDate = moment(submitInfo.setupDate).format("YYYY-MM-DD")
    get("/api/clazz/" + formData.type, submitInfo)
      .then(res => {
        const { success } = res
        if (success) {
          setFormData({ visible: false })
          setQueryData(null)
          message.success('更新成功')
        }
      })
  }

  const handleClickOk = () => {
    clazzForm.submit()
  }

  return (
    <>
      <Drawer
        title="操作班级数据"
        width={720}
        onClose={() => setFormData({ visible: false })}
        visible={formData.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setFormData({ visible: false })} style={{ marginRight: 8 }}>
              取消
              </Button>
            <Button onClick={handleClickOk} type="primary">
              提交
              </Button>
          </div>
        }
      >
        <Form
          name="clazzForm"
          form={clazzForm}
          onFinish={handleFinish}
          layout="vertical"
          hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="clazzName"
                label="班级全称"
                rules={[{ required: true, message: '请输入班级全称' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="clazzAlias"
                label="班级简称"
                rules={[{ required: true, message: '请输入班级简称' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="isSpecial"
                label="是否为创新班"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Radio.Group>
                  <Radio value={0}>否</Radio>
                  <Radio value={1}>是</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="school"
                label="校区"
                rules={[{ required: true, message: '请选择校区' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="屯溪路校区">屯溪路校区</Option>
                  <Option value="翡翠湖校区">翡翠湖校区</Option>
                  <Option value="宣称校区">宣称校区</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="major"
                label="专业"
                rules={[{ required: true, message: '请输入专业' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="monitor"
                label="班长"
                rules={[{ required: true, message: '请输入班长' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="commisStudy"
                label="学习委员"
                rules={[{ required: true, message: '请输入学习委员' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="secretary"
                label="团支书"
                rules={[{ required: true, message: '请输入团支书' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="teacher"
                label="班主任"
                rules={[{ required: true, message: '请输入班主任' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="qq"
                label="QQ群"
                rules={[{ required: true, message: '请输入QQ群' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="wechat"
                label="微信群"
                rules={[{ required: true, message: '请输入微信群' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="number"
                label="班级人数"
                rules={[{ required: true, message: '请输入班级人数' }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numberGirl"
                label="女生人数"
                rules={[{ required: true, message: '请输入女生人数' }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="currentBalance"
                label="班费剩余"
                rules={[{ required: true, message: '请输入班费' }]}
              >
                <InputNumber step={0.1} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="setupDate"
                label="班级创建时间"
                rules={[{ type: 'object', required: true, message: '请选择日期时间' }]}>
                <DatePicker showTime format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="honors"
                label="班级荣誉"
                rules={[
                  {
                    required: true,
                    message: '请输入班级荣誉',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="请输入班级荣誉" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>


      
    </>
  )
}
