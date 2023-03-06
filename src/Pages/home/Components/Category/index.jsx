import React, { Component } from "react";
import { Divider, Button, List, Space, Input, Popconfirm, message } from "antd";

import { httpReq } from "../../../../tools/utils/httpReq.js";

export default class Category extends Component {
  //初始化状态
  state = {
    data: "",
    add: false,
    loading: true,
    newC:''
  };
  // 组件挂载后获取商品信息
  componentDidMount() {
    httpReq("get","/categories/all-categories/1/10").then(
      (res) => {
        this.setState({ data: res.data, total: res.total, loading: false });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  render() {
    const { data } = this.state;
    //伪数组化真数组
    let data1 = [...data];

    return (
      <div
        className="showplatform"
        style={{ height: "550px", minWidth: "80vw"}}
      >
        <div className="dicrip" style={{ fontSize: "12px",background:'white',paddingLeft:'20px' }}>
          <h2 style={{ marginBottom: "10"}}>分类管理</h2>
          商品分类展示，新增分类，删除分类
          <Divider style={{ margin: "0px" }} />
          <div className="newCategories">
            {this.state.add ? (
              <Space size="middle" style={{ margin: "15px" }}>
                分类管理:
                <Input
                  onChange={(e) => {
                    this.setState({ newC: e.target.value });
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    //判断是否为空
                    if(this.state.newC===''){message.error('新增分类的名称不能为空');return}
                    const data = {categoryName:this.state.newC,curTotal:'0'}
                    httpReq('post','/categories/category',data).then(
                      res => {message.success(res.msg);this.setState({data:res.data})},
                      err => {message.success(err.msg);}
                    )
                    this.setState({ add: false });
                  }}
                >
                  确定
                </Button>
                <Button
                  danger
                  onClick={() => {
                    this.setState({ add: false });
                  }}
                >
                  取消
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                style={{ margin: "15px" }}
                onClick={() => {
                  this.setState({ add: true });
                }}
              >
                新增分类
              </Button>
            )}
          </div>
          <Divider style={{ margin: "0px" }} />
        </div>
        <div style={{margin:'10px',minWidth:'80vw'}}>
          <List
            style={{ background: "white", height: "450px", overflow: "auto" }}
            loading={this.state.loading}
            bordered={true}
            split={true}
            dataSource={data1}
            renderItem={(item) => (
              <List.Item
                style={{
                  margin: "10px 40px",
                  height: "70px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <List.Item.Meta
                  title={item.categoryName}
                  description={`共计${item.total}件商品`}
                />
                <Popconfirm
                  title="确定删除该分类嘛"
                  okText="是"
                  cancelText="否"
                  onConfirm={() => {
                    item.total = String(item.total)
                    console.log(typeof(item.total));
                    httpReq('delete',`/categories/category/{${item._id}}/${item.total}`).then(
                      res => {console.log(res);},
                      err => {console.log(err);}
                    )
                  }}
                >
                  <Button size="large" type="primary" danger>
                    删除分类
                  </Button>
                </Popconfirm>
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    );
  }
}
