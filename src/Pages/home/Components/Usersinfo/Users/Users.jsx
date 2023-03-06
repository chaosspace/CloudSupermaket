import React, { Component } from "react";
import { Space, Table, Button, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import Utils from "../../../../../tools/utils/httpUtil";
import { httpReq } from "../../../../../tools/utils/httpReq";

export default class Users extends Component {
  //初始化状态
  state = {
    loading: true,
    data: ""
  };
  //页面完成后加载第一页用户信息
  componentDidMount() {
    Utils.getUsers({ current: 1, pageSize: 6 }).then(
      (res) => {
        const { users, total } = res;
        //在state中存储total
        this.setState({ total: total });
        //赋予每个用户一个唯一的key
        const newUsers = users.map((user) => {
          user.key = user._id;
          return user;
        });
        this.setState({ data: newUsers });
        this.setState({ loading: false });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //换页时数据更替
  pagechange = (page) =>{
    this.setState({loading:true})
    Utils.getUsers({ current: page, pageSize: 6 }).then(
      res => {
        const {users} = res
        this.setState({loading:false})
        const newUsers = users.map((user) => {
          user.key = user._id;
          return user;
        });
        this.setState({data:newUsers})
      },
      err => {console.log(err);}
    )
  }
  //删除用户确认对话框
  confirm = (record) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `确认要删除${record.name}吗?`,
      okText: "确认",
      cancelText: "取消",
      onOk:() => {
        httpReq('delete',`/users/user/{${record._id}}`).then(
          res => {message.success(res.msg);this.props.history.go(0)},
          err => {message.error(err)}
        )
      }
    });
  };
  render() {
    const columns = [
      {
        title: "账号",
        dataIndex: "useraccount",
        key: "account",
      },
      {
        title: "密码",
        dataIndex: "userpwd",
        key: "password",
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "性别",
        key: "gender",
        dataIndex: "gender",
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "telephone",
      },
      {
        title: "地址",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "操作",
        key: "operations",
        render: (record) => (
          <Space size="middle">
            <Link to={`/home/usersinfo/changepsw/${record._id}/${record.name}/${record.useraccount}/${record.userpwd}`}>
              <Button type="primary">更改密码</Button>
            </Link>
            <Button
              danger
              onClick={()=>{
                this.confirm(record)
              }}
            >
              删除用户
            </Button>
          </Space>
        )
      },
    ];
    const data = this.state.data;
    return (
      <div style={{margin:'0 16px'}}>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={data}
          pagination={{
            defaultCurrent: 1,
            total: this.state.total,
            onChange: (page) => {
              this.pagechange(page)
            },
          }}
        />
      </div>
    );
  }
}
