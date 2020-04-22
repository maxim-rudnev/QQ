import React, { Component  } from 'react';
import { Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { QuestionManager } from './components/QuestionManager.js';


import {
    PlayCircleOutlined,
    DatabaseOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  } from '@ant-design/icons';


import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './custom.css'


const { Header, Content, Footer, Sider } = Layout;



export default class App extends Component {
    static displayName = App.name;
    

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <DatabaseOutlined />
                            <span>Администрирование</span>
                            <Link to="/administration" />
                        </Menu.Item>
                        <Menu.Item key="2">
                            <PlayCircleOutlined /> 
                            <span>Тестирование</span>
                            <Link to="/testing" />
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Route path='/administration' component={QuestionManager} />
                        <Route path='/testing' component={() => <div>test</div>} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


