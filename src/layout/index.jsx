import React from 'react';
import { Layout } from 'antd';
import { HashRouter as Router, Route } from 'react-router-dom';

import SiderMenu from './SiderMenu'
import ClazzTable from '../pages/clazz/table'
import StudentTable from '../pages/student/table'

import "./index.less"

const { Header, Content, Footer } = Layout;

class MainLayout extends React.Component {

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <SiderMenu />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
              <div className='layout-header-left'>
              班级学生管理系统
              </div>
              <div className='layout-header-right'></div>
            </Header>

            <Content style={{ margin: '24px 48px' }}>
              <Route exact key="clazz-table" path="/clazz/table" component={ClazzTable} />
              <Route exact key="student-table" path="/student/table" component={StudentTable} />
            </Content>

            <Footer style={{ textAlign: 'center' }}>IS开发实训 ©2020 Created by p697</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default MainLayout
