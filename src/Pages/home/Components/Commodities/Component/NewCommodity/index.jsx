import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Form, Button, Select, InputNumber, Upload, message } from "antd";

import { httpReq } from "../../../../../../tools/utils/httpReq";

export default class NewCommodity extends Component {


  //表单提交函数
  onFinish = (data) => {
    console.log(data);
    let formData = new FormData()
    formData.append('file',data.commodityImg.file)
    formData.append('cost',data.commodityCost)
    formData.append('currentPrice',data.commodityPrice)
    formData.append('inventory',data.commodityStorage)
    formData.append('commodityName',data.commodityName)
    formData.append('sellingUnit',data.sellUnit)
    formData.append('category_id','')
    formData.append('danger_inventory',data.commodityAlert)
    httpReq('post',`commodities/commodity`,FormData)
    .then(
      res => {
        message.success(res.msg)
        console.log(res);
      },
      err => {
        message.error(err.msg)
      }
    )
  }
  render() {
    const { Option } = Select;
    const normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
          return e;
      }
      return e && e.fileList;
    };
    return (
      <div
        style={{
          margin: "0px 15px",
          paddingTop: "15px",
          marginTop: "20px",
          background: "white",
        }}
      >
        <Link
          style={{ margin: "0 10px", display: "inline-block" }}
          to="/home/commodities"
        >
          <LeftOutlined />
        </Link>
        商品信息管理/新增商品
        <div style={{ height: "550px" }}>
          <Form
            size="middle"
            style={{ width: "400px", margin: "0 auto" }}
            onFinish={this.onFinish}
            requiredMark={false}
          >
            <Form.Item
              name={"commodityName"}
              label="商品名称:"
              rules={[
                {
                  required: true,
                  message: "请输入商品名称",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name={"commodityCategory"}
              label="商品分类:"
              rules={[
                {
                  required: true,
                  message: "请输入商品分类",
                },
              ]}
            >
              <Select>
                <Option value={"代餐品"}>代餐品</Option>
                <Option value={"休闲零食"}>休闲零食</Option>
                <Option value={"日用品"}>日用品</Option>
                <Option value={"饮品"}>饮品</Option>
                <Option value={"零食"}>零食</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"commodityCost"}
              label="商品成本:"
              rules={[
                {
                  required: true,
                  message: "请输入商品成本",
                },
              ]}
            >
              <InputNumber style={{ width: "330px" }}></InputNumber>
            </Form.Item>
            <Form.Item
              name={"commodityPrice"}
              label="商品现价:"
              rules={[
                {
                  required: true,
                  message: "请输入商品现价",
                },
              ]}
            >
              <InputNumber style={{ width: "330px" }}></InputNumber>
            </Form.Item>
            <Form.Item
              name={"commodityStorage"}
              label="商品库存:"
              rules={[
                {
                  required: true,
                  message: "请输入商品库存",
                },
              ]}
            >
              <InputNumber style={{ width: "330px" }}></InputNumber>
            </Form.Item>
            <Form.Item
              name={"commodityAlert"}
              label="商品警戒库存:"
              rules={[
                {
                  required: true,
                  message: "请输入商品警戒库存",
                },
              ]}
            >
              <InputNumber style={{ width: "300px" }}></InputNumber>
            </Form.Item>
            <Form.Item
              name={"sellUnit"}
              label="售卖单位:"
              rules={[
                {
                  required: true,
                  message: "请输入售卖单位",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name={"commodityImg"}
              label="图片上传:"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "请上传图片",
                },
              ]}
            >
              <Upload
                name="file"
                headers={{ authourization: "authorization-text" }}
                beforeUpload={() => {
                  return false;
                }}
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  style={{ borderRadius: "5px" }}
                >
                  上传图片
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <div style={{display:'flex',justifyContent:'center'}}>
                <Button
                  type="primary"
                  size="middle"
                  htmlType="submit"
                  style={{ borderRadius: "5px" }}
                >
                  添加
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
