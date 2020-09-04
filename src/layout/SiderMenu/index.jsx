import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import schoolLogo from '../../assets/images/school_logo.png'

import "./index.less"

const { Sider } = Layout;
const { SubMenu } = Menu;

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(c) => setCollapsed(c)}>
      <div className="sider-header">
        <img className="sider-header-img" src={schoolLogo} alt='logo' />
        <div className="sider-header-title">学生互评管理系统</div>
      </div>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="sub1" icon={<UserOutlined />} title="班级信息管理">
          <Menu.Item key="3">班级信息表</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="学生信息管理">
          <Menu.Item key="6">学生信息表</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />} />
      </Menu>
    </Sider>
  )
}