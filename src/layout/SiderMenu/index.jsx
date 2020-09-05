import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FileOutlined } from '@ant-design/icons';
import schoolLogo from '../../assets/images/school_logo.png'

import "./index.less"

const { Sider } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(c) => setCollapsed(c)}>
      <div className="sider-header">
        <img className="sider-header-img" src={schoolLogo} alt='logo' />
        {
          !collapsed ? <div className="sider-header-title">班级学生管理系统</div> : null
        }
      </div>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {
          !collapsed ? <div className="sider-content-title">班级管理</div> : null
        }
        <Menu.Item key="1" icon={<FileOutlined />} >
          <Link to="/clazz/table">班级信息表</Link>
        </Menu.Item>

        {
          !collapsed ? <div className="sider-content-title">学生管理</div> : null
        }
        <Menu.Item key="2" icon={<FileOutlined />} >
          <Link to="/student/table">学生信息表</Link>
        </Menu.Item>

      </Menu>
    </Sider>
  )
}