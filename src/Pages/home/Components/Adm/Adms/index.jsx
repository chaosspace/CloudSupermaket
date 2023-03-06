import React, { Component } from 'react'
import { Space, Table,Button,Image, Modal, message,Upload } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { httpReq } from '../../../../../tools/utils/httpReq'
import binaryArrToUrl from '../../../../../tools/utils/bainaryArrToUrl'

export default class Adms extends Component {
  //状态初始化
  state = {
    adms:'',
    isLoading:true,
  }
  //挂载组件后获取广告信息
  componentDidMount(){
    httpReq('get','/ads/all-ads').then(
      res => {
        //为每个广告加上一个唯一的key
        let data = [...res]
        let newdata = data.map((adm) => {
          adm.key = adm._id;
          return adm;
        })
        //保存数据到状态
        this.setState({adms:newdata,isLoading:false})
      },
      err => {console.log(err);}
    )
  }

  render() {
    const data = this.state.adms
    const columns = [
      {
        title: '广告公司',
        dataIndex: 'adCompany',
        key: 'adCompany'
      },
      {
        title: '广告名称',
        dataIndex: 'adName',
        key: 'adName',
      },
      {
        title: '所属分类',
        dataIndex: 'adCategory',
        key: 'adCategory',
      },
      {
        title: '广告图片',
        key:'file',
        dataIndex: 'file',
        render:(_,ad) => {
          const file = ad.file
          const url = binaryArrToUrl(file)
          return <Image preview={false} width={150} src={url}/>
        }
      },
      {
        title: '操作',
        dataIndex: 'operations',
        render: (_,record) => (
          <Space size="middle">
              <Upload showUploadList={false}
                headers={{authourization:'authorization-text'}}
                beforeUpload={()=>{
                  return false
                }}
                onChange={(file)=>{
                  const data = {_id:record._id,file:file.file}
                  console.log(data);
                  let formData = new FormData()
                  formData.append('_id',record._id)
                  formData.append('file',file.file)
                  httpReq('put','/ads/ad',formData).then(
                    res => {
                      console.log(res);
                      message.success(res.msg)
                    },
                    err => {console.log(err);}
                  )
                }}
              >
                <Button type="primary" >更改图片</Button>
              </Upload>
            <Button
              danger
              onClick={()=>{
                Modal.confirm({
                  title:'confirm',
                  icon: <ExclamationCircleOutlined />,
                  content:'确认要删除这条广告吗',
                  okText:'确认',
                  cancelText: "取消",
                  onOk:()=>{
                    console.log(record);
                    httpReq('delete',`/ads/ad/${record._id}`).then(
                      res => {
                        message.success(res.msg);
                        this.props.history.go(0)
                      },
                      err => {console.log(err);}
                    )
                  }
                })
              }}
            >
              删除广告
            </Button>
          </Space>
        )
      }
    ]
    
    return (
      <div style={{margin:'0 15px',height:'500px',overflow:'auto'}}>
        <Table loading={this.state.isLoading} columns={columns} dataSource={data} pagination={false}/>
      </div>
    )
  }
}
