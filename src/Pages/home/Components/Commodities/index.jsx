import React, { Component } from "react";
import { Divider } from "antd";
import {Switch,Route,Redirect} from 'react-router-dom'

//子组件
import NewCommodity from "./Component/NewCommodity/index.jsx";
import PageCommodities from "./Component/PageCommodities/index.jsx";

export default class Commodities extends Component {
  
  render() {
    return (
      <div style={{background:'#f2f2f2',height:'92vh',margin:'0'}}>
        <div className='showplatform' style={{height:'550px',minWidth:'80vw'}}>
          <div
            className="dicrip"
            style={{ fontSize: "12px",background:'white',paddingLeft:'20px'}}
          >
            <h2 style={{ marginBottom: "10" }}>商品管理</h2>
            仓库信息展示，可进行新增商品，搜索商品，编辑商品，删除商品操作
          </div>
          <Divider style={{margin:'0px'}} />
          <Switch>
            <Route path='/home/commodities/newcommodity' component={NewCommodity}></Route>
            <Route path='/home/commodities' component={PageCommodities}></Route>
            <Redirect to='/home/commodities'/>
          </Switch>
        </div>
      </div>
    );
  }
}
