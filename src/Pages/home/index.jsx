import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AlignLeftOutlined,
  UserOutlined,
  GroupOutlined,
  LogoutOutlined,
  PieChartOutlined,
  FileTextOutlined,
  PayCircleOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Redirect,Switch,Route, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./home.css";
//子组件
import Usersinfo from "./Components/Usersinfo";
import Dataprofile from "./Components/DataProfile/Dataprofile";
import Commodities from "./Components/Commodities";
import Categories from './Components/Category'
import Order from "./Components/Order";
import Adm from "./Components/Adm";

const { Header, Sider, Content } = Layout;
//组件渲染
const Home = () => {
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false);
  //信息跳转函数
  function stepTo(flag){
    switch(flag){
      case '1': history.push('/home/dataprofile');break
      case '2': history.push('/home/usersinfo');break
      case '3': history.push('/home/commodities');break
      case '4': history.push('/home/categories');break
      case '5': history.push('/home/order');break
      case '6': history.push('/home/adm');break
      default:history.push('/home');
    }
  }
  //登出函数
  function logout() {
    sessionStorage.removeItem("token");
  }
  //token验证
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Redirect to='/login'/>
  } else {
    return (
      <Layout style={{ minHeight: "100vh",background:'#f2f2f2',minWidth:'1300px'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <div className="title">重邮云超市管理系统</div>
          <Menu onClick={(e)=>{stepTo(e.key)}}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <PieChartOutlined />,
                label: "数据概况",
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "用户信息管理",
              },
              {
                key: "3",
                icon: <AlignLeftOutlined/>,
                label: '商品信息管理',
              },
              {
                key: "4",
                icon: <GroupOutlined />,
                label: "商品分类管理",
              },
              {
                key: "5",
                icon: <FileTextOutlined />,
                label: "订单信息管理",
              },
              {
                key: "6",
                icon: <PayCircleOutlined />,
                label: "广告投放管理",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              paddingLeft: "15px",
              height:'40px',
              display: "flex",
              alignItems:'center',
              justifyContent: "space-between"
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Link to="/login">
              <LogoutOutlined className="iconWrap" style={{ fontSize:'20px',cursor: "pointer",color:'grey' }} onClick={logout} title="退出登录"/>
            </Link>
          </Header>
          <Content
            className="site-layout-background"
            // style={{margin: "10px 0"}}
            style={{background:'#f2f2f2',height:'92vh',margin:'0'}}
          >
            <Switch>
              <Route path='/home/order' component={Order}></Route>
              <Route path='/home/adm' component={Adm}></Route>
              <Route path='/home/categories' component={Categories}></Route>
              <Route path='/home/commodities' component={Commodities}></Route>
              <Route path='/home/usersinfo' component={Usersinfo} />
              <Route path='/home/dataprofile' component={Dataprofile} />
              <Route path='/home' component={Dataprofile}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
};
export default Home;