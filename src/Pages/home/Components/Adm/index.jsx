import React, { Component } from 'react'
import { Button,Divider } from 'antd';
import { Link,Route,Redirect,Switch } from 'react-router-dom'

//子组件
import NewAdm from './NewAdm';
import Adms from './Adms';


export default class Adm extends Component {

  render() {
    return (
      <div style={{background:'#f2f2f2',height:'92vh',margin:'0'}}>
        <div className="dicrip" style={{marginBottom:'25px',fontSize:'12px',paddingLeft:'20px',background:'white'}}>
          <h2 style={{marginBottom:'2'}}>广告管理</h2>
          广告信息展示，可以进行新增广告，更改广告，删除广告操作。注意：最多只允许5个广告位
          <Divider style={{ margin: "0px" }} />
          <div className='newAdm'>
            <Link to='/home/adm/newadm'>
              <Button type='primary' style={{ margin: "15px" }}>新增广告</Button>
            </Link>
          </div>
        </div>
        <Switch>
          <Route path='/home/adm/newadm' component={NewAdm} />
          <Route path='/home/adm/' component={Adms} />
          <Redirect to='/home/adm' />
        </Switch>
      </div>
    )
  }
}
