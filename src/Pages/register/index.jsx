import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Button, message } from "antd";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import "./register.css";

export default class Register extends Component {
  //初始化
  state = {
    namelegal: false,
    acctlegal: false,
    pswrdlegal: false,
    enspswrdlegal: false,
    name:'',
    acct:''
  };
  //判断输入是否合法，并将数据保存在state中
  inputchange = (e) => {
    const { name, value } = e.target;
    this.setState({ [`${name}legal`]: this.islegal(value) });
  };
  inputpschange = (e) => {
    const { name, value } = e.target;
    this.setState({[`${name}`]:value})
    this.setState({ [`${name}legal`]: this.ispslegal(value) });
  };
  islegal = (value) => {
    return value.trim() === "" ? false : value.trim().length < 3 ? false : true;
  };
  ispslegal = (value) => {
    return value === "" ? false : value.length < 3 ? false : true;
  };
  //注册按钮函数
  Register = () => {
    const {namelegal,acctlegal,pswrdlegal,enspswrd,pswrd} = this.state
    //判断注册信息是否合法
    if(namelegal&&acctlegal&&pswrdlegal&&enspswrd===pswrd){
      const {name,acct} = this.state
      const data = {name: name,adminaccount: acct,adminpwd: pswrd}
      //合法数据 发送注册请求
      axios.post('/api/admins/register',data).then(
        res => {
          const {msg} = res.data.data
          message.success(msg,2,()=>{console.log(this.props.history.replace('/login'))})
        },
        err => {
          const {msg} = err.response.data
          message.error(msg,2)
        }
      )
    }else{
      //注册信息不合法
      message.warn('注册信息有误，请仔细核对哟',1)
    }
  }
  render() {
    const { namelegal, acctlegal, pswrdlegal, enspswrdlegal,pswrd,enspswrd } = this.state;
    return (
      <div className="wrap">
        <div className="bgimg">
          <img src="/icons/bg.jpg" alt="error" className="img" />
        </div>
        <div className="content">
          <div style={{ textAlign: "center", display: "block !important" }}>
            请新建你的帐号
          </div>
          <div>
            <div className="nameipt">
              <Input
                name="name"
                style={{ borderColor: namelegal ? "greenyellow" : "" }}
                type="text"
                placeholder="请输入您的名字"
                onChange={(e) => {
                  this.setState({name:e.target.value})
                  this.inputchange(e);
                }}
              />
            </div>
            <div className="namealert alert"></div>
          </div>
          <div>
            <div className="acctipt">
              <Input
                name="acct"
                style={{ borderColor: acctlegal ? "greenyellow" : "" }}
                type="text"
                placeholder="请输入您的账号"
                onChange={(e) => {
                  this.setState({acct:e.target.value})
                  this.inputchange(e);
                }}
              />
            </div>
            <div className="acctalert alert"></div>
          </div>
          <div>
            <div className="pswrdipt">
              <Input.Password
                name="pswrd"
                style={{ borderColor: pswrdlegal ? "greenyellow" : "" }}
                placeholder="请输入您的密码"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => {
                  this.setState({pswrd:e.target.value})
                  this.inputpschange(e);
                }}
              />
            </div>
            <div className="pswrdalert alert"></div>
          </div>
          <div>
            <div>
              <div className="ensurepswrdipt">
                <Input.Password
                  name="enspswrd"
                  style={{ borderColor: enspswrdlegal ?(enspswrd===pswrd)?"greenyellow":'':"" }}
                  placeholder="请输入您的密码"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => {
                    this.inputpschange(e);
                  }}
                />
              </div>
            </div>
            <div className="ensurepswrdalert alert"></div>
            <div className="operation">
              <Button onClick={this.Register} style={{ width: "110px", height: "40px" }}>注册</Button>
              <Link to="/login">
                <Button style={{ width: "110px", height: "40px" }}>返回</Button>
              </Link>
            </div>
            <div className="footer">
              Super-CQUPT-Supermarket-Management-System
            </div>
            <div className="designer">Designed By HBC</div>
          </div>
        </div>
      </div>
    );
  }
}