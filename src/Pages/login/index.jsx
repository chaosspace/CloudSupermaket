import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Checkbox,message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input,Button } from "antd";

import loginstyle from "./login.module.css";
import util from '../../tools/utils/httpUtil'

message.config({
  maxCount:1,
  top:70
})

export default class Login extends Component {
  //初始化
  state = {
    alrt: false,
    isAuth: false,
    acct:'',
    pswrd:''
  };

  //登录post请求
  Login = () => {
    const { pswrd,acct} = this.state
    if(acct===''||pswrd===''){
      message.warn('输入信息不全',2)
      return
    }
    let data = { adminaccount: acct, adminpwd: pswrd }
    util.login(data).then(
      res => {
        sessionStorage.setItem("token", res.token);
        message.success(`尊敬的<${acct}>，欢迎您！`,2)
        this.props.history.replace('/home')
      },
      (err) => {console.log(err);}
    )
  }

  render() {
 
    return (
      <div className={loginstyle.wrap}>
        <div className="bgimg">
          <img src="/icons/bg.jpg" alt="error" className="img" />
        </div>
        <div className={loginstyle.alrt}></div>
        <div className={loginstyle.content}>
          <div style={{ textAlign: "center", display: "block!important" }}>
            请使用您的账号和密码登录
          </div>
          <div>
            <div className={loginstyle.acctipt}>
            <Input type='text' placeholder="请输入您的账号" onChange={(e)=>{this.setState({acct:e.target.value})}}/>
            </div>
            <div className={loginstyle.acctd}></div>
          </div>
          <div>
            <div className={loginstyle.pswrdipt}>
              <Input.Password
                placeholder="请输入您的密码"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e)=>{this.setState({pswrd:e.target.value})}}
                onKeyDown ={(e)=>{if(e.key==='Enter')this.Login()}}
              />
            </div>
            <div className={loginstyle.pswrdd}></div>
          </div>
          <div className={loginstyle.storepswrd}>
            <div>
              <Checkbox>记住密码</Checkbox>
            </div>
            <div className="skiplogin">跳过登录</div>
          </div>
          <div className={loginstyle.operation}>
            <Button style={{width:'130px',height:'40px'}} onClick={this.Login}>登录</Button>
            <Link to='/register'>
              <Button style={{width:'130px',height:'40px'}} >注册</Button>
            </Link>
          </div>
          <div className="footer">
            Super-CQUPT-Supermarket-Management-System
          </div>
          <div className="designer">Designed By HBC</div>
        </div>
      </div>
    );
  }
}
