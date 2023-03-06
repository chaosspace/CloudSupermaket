import React, { Component } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";

import { httpReq } from "../../../../../tools/utils/httpReq";

export default class Changepsw extends Component {
  //初始化
  state = {
    newPsw: "",
  };
  //将新密码存在状态中
  setNewPsw = (e) => {
    const { value } = e.target;
    this.setState({ newPsw: value });
  };
  //点击按钮后提交更改密码请求
  changepsw = (id) => {
    const { newPsw } = this.state;
    const data = {
      _id: id,
      modifiedpassword: newPsw,
    };
    httpReq("put", "/users/user", data).then(
      (res) => {
        message.success(res.msg);
        this.props.history.replace("/home/usersinfo");
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          message.warning("新密码不能为空");
        } else {
          message.error(err);
        }
      }
    );
  };
  render() {
    //获取用户信息
    const { id, name, acct, prepswd } = this.props.match.params;
    return (
      <div>
        <Link
          style={{ margin: "0 10px", display: "inline-block" }}
          to="/home/usersinfo"
        >
          <LeftOutlined />
        </Link>
        用户信息管理/修改用户密码
        <div
          style={{
            width: "600px",
            margin: "80px auto",
            height: "300px",
          }}
        >
          <Form size="middle" style={{ width: "300px", margin: "0 auto" }}>
            <Form.Item label="用户姓名:">{name}</Form.Item>
            <Form.Item label="用户账号:">{acct}</Form.Item>
            <Form.Item label="原密码:">{prepswd}</Form.Item>
            <Form.Item label="新密码:">
              <Input.Password
                onChange={(e) => {
                  this.setNewPsw(e);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  this.changepsw(id);
                }}
              >
                提交修改
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
