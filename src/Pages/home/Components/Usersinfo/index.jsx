import React, { Component } from "react";
import {Route,Switch} from 'react-router-dom'

import Changepsw from "./Changepsw";
import Users from "./Users/Users";

export default class Usersinfo extends Component {

  render() {
    return (
      <div style={{height:'92vh'}}>
        <div className="dicrip" style={{marginBottom:'25px',fontSize:'12px',paddingLeft:'20px',background:'white'}}>
          <h2 style={{marginBottom:'2'}}>用户列表</h2>
          用户信息展示，可进行用户密码修改和删除用户操作
        </div>
        <Switch>
          <Route path='/home/usersinfo/changepsw/:id/:name/:acct/:prepswd' component={Changepsw}/>
          <Route path='/home/usersinfo' component={Users}></Route>
        </Switch>
      </div>
    );
  }
}
