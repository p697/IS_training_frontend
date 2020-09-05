import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Popover, Button, Form, Input, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

import { get } from '../../../utils/request'
import ClazzForm from '../../../coms/ClazzForm'
import "./index.less"

const moment = require('moment');

export default () => {
  const [tableData, setTableData] = useState([])
  const [queryData, setQueryData] = useState("")
  const [formData, setFormData] = useState({})
  const [searchForm] = Form.useForm();

  // 获取数据
  useEffect(() => {
    if (queryData === null) {
      setQueryData("")
    } else {
      get("/api/clazz/query", { clazzName: queryData })
        .then(res => {
          const { success, data } = res
          if (success) {
            setTableData(data.clazzList.map(clazzInfo => {
              const { id, clazzAlias, secretary, commisStudy, wechat, numberGirl, setupDate } = clazzInfo
              return {
                ...clazzInfo,
                description: `班级ID：${id}；  班级简称：${clazzAlias}；  团支书：${secretary}；  学习委员：${commisStudy}；  微信群：${wechat}；  女生人数：${numberGirl}；  班级创建时间：${moment(setupDate).format("YYYY-MM-DD")}`
              }
            }))
          }
        })
    }
  }, [queryData])

  const columns = [
    {
      title: '校区',
      dataIndex: 'school',
    },
    {
      title: '专业',
      dataIndex: 'major',
    },
    {
      title: '班级',
      dataIndex: 'clazzName',
    },
    {
      title: '创新班',
      dataIndex: 'isSpecial',
      render: (text) => {
        return text === 0 ? <Tag color="gold">否</Tag> : <Tag color="green">是</Tag>
      }
    },
    {
      title: '班长',
      dataIndex: 'monitor',
    },
    // {
    //   title: '团支书',
    //   dataIndex: 'secretary',
    // },
    // {
    //   title: '学委',
    //   dataIndex: 'commisStudy',
    // },
    {
      title: '班主任',
      dataIndex: 'teacher',
    },
    {
      title: 'QQ群',
      dataIndex: 'qq',
    },
    // {
    //   title: '微信群',
    //   dataIndex: 'wechat',
    // },
    {
      title: '人数',
      dataIndex: 'number',
    },
    // {
    //   title: '女生人数',
    //   dataIndex: 'numberGirl',
    // },
    {
      title: '剩余班费',
      dataIndex: 'currentBalance',
    },
    {
      title: '荣誉',
      render: (text, record) => {
        const content = (
          <div>
            <p>{record.honors}</p>
          </div>
        );
        return (
          <Popover content={content} title="班级荣誉">
            <button
              className="clazz-table-operation-btn clazz-table-operation-btn_blue"
            >查看</button>
          </Popover>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'right',
      width: 'fit-content',
      render: (text, record) =>
        <div className="clazz-table-operation">
          <button
            className="clazz-table-operation-btn clazz-table-operation-btn_blue"
            onClick={() => handleChange(record)}
          >修改</button>
          <div className="clazz-table-operation-line"></div>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <button className="clazz-table-operation-btn clazz-table-operation-btn_red">删除</button>
          </Popconfirm>
        </div>
    },
  ];

  const handleDelete = (id) => {
    get("/api/clazz/delete", { id })
      .then(res => {
        const { success } = res
        if (success) {
          get("/api/clazz/query")
            .then(res => {
              const { success, data } = res
              if (success) {
                setTableData(data.clazzList)
              }
            })
        }
      })
  }

  const handleClickAddClazz = () => {
    setFormData({
      visible: true,
      type: "add",
    })
  }

  const cleanSearchInput = () => {
    setQueryData("")
  }

  const handleSearch = ({ searchInfo }) => {
    setQueryData(searchInfo)
  }

  const handleChange = (record) => {
    setFormData({
      visible: true,
      type: "update",
      ...record,
    })
  }

  return (
    <div>
      <div className='clazz-header'>
        <div className='clazz-header-left'>
          <Form form={searchForm} name="clazz_search" layout="inline" onFinish={handleSearch}>
            <Form.Item name="searchInfo">
              <Input
                prefix={<SearchOutlined className='clazz-header-left-icon' />}
                placeholder="请输入班级名称"
              />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!searchForm.getFieldValue('searchInfo')}
                >
                  搜索
                </Button>
              )}
            </Form.Item>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  onClick={cleanSearchInput}
                  disabled={!queryData}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className='clazz-header-right'>
          <Button type='primary' onClick={handleClickAddClazz}>单个录入</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={record => record.id}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
      />

      <ClazzForm type="update" formData={formData} setFormData={setFormData} setQueryData={setQueryData} />
    </div>
  )
}
