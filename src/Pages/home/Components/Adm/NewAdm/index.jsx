import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button,Form,Input } from 'antd';
import { message, Upload } from 'antd';
import { LeftOutlined,UploadOutlined } from "@ant-design/icons";

import { httpReq } from '../../../../../tools/utils/httpReq';

export default class NewAdm extends Component {
  //状态初始化
  state = {
    adCompany:'',
    adName:'',
    adCategory:'',
  }
  //收集表单数据的回调
  onFinish = (data) => {
    //判断提交数据是否为空
    //提交数据
    let formData = new FormData()
    formData.append('file',data.file.file)
    formData.append('adCompany',data.adCompany)
    formData.append('adCategory',data.adCategory)
    formData.append('adName',data.adName)
    httpReq('post','/ads/ad',formData).then(
      res => {
        message.success(res.msg)
        this.props.history.push('/home/adm')
      },
      err => {
        message.error(err.msg)
      }
    )
  }
  render() {
    return (
      <div style={{margin:'0px 15px',background:'white',paddingTop:'15px',paddingBottom:'10px'}}>
        <Link
          style={{ margin: "0 10px", display: "inline-block" }}
          to="/home/adm"
        >
          <LeftOutlined />
        </Link>
        广告投放管理/新增广告
        <div
          style={{
            width: "600px",
            margin: "80px auto",
            height: "300px",
          }}
        >
          <Form size="middle" style={{ width: "300px", margin: "0 auto" }} onFinish={this.onFinish} requiredMark={false}>
            <Form.Item 
              name='adCompany'
              label="广告公司:"
              rules={[{
                required:true,
                message:'请输入广告公司'
              }]} 
            >
              <Input 
                onChange={(e)=>{this.setState({adCompany:e.target.value})}}
              />
            </Form.Item>
            <Form.Item 
              name='adName'
              rules={[{
                required:true,
                message:'请输入广告名称'
              }]} 
              label="广告名称:"
            >
              <Input 
                onChange={(e)=>{this.setState({adName:e.target.value})}}
              />
            </Form.Item>
            <Form.Item 
              name='adCategory'
              rules={[{
                required:true,
                message:'请输入广告分类'
              }]} 
              label="所属分类:"
            >
              <Input 
                onChange={(e)=>{this.setState({adCategory:e.target.value})}}
              />
            </Form.Item>
            <Form.Item
              label="图片地址:"
              name='file'
              rules={[{
                required:true,
                message:'请上传广告图片'
              }]}
            >
              <Upload 
                name='file' 
                headers={{authourization:'authorization-text'}}
                beforeUpload={()=>{
                  return false
                }}
                maxCount = {1}
              >
                <Button icon={<UploadOutlined />} type='primary' size='middle' style={{borderRadius:'5px'}}>
                  上传图片
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
              >
                添加
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
