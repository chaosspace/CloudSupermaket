import React, { Component } from "react";
import { Select,Input,Space,Button,message } from "antd";
import { HeartTwoTone,SearchOutlined } from '@ant-design/icons';

import Commodity from "./Commodity/Commodity.jsx";
import { httpReq } from "../../../../../../tools/utils/httpReq.js";

export default class PageCommodities extends Component {
  //初始化
  state = {
    data: "",
    total: "",
    popularity:"",
    commodityName:'',
    inventoryStatus:'',
  };

  //组件挂载后获取商品信息
  componentDidMount() {
    const {popularity, commodityName, inventoryStatus} = this.state
    httpReq("get", `/commodities/all-commodities?count=1&pageSize=9&${popularity}&${commodityName}&${inventoryStatus}`).then(
      (res) => {
        this.setState({ data: res.data, total: res.total });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //搜索函数
  search = () => {
    const {popularity, commodityName, inventoryStatus} = this.state
    httpReq("get", `/commodities/all-commodities?count=1&pageSize=8&popularity=${popularity}&commodityName=${commodityName}&inventoryStatus=${inventoryStatus}`).then(
      (res) => {
        this.setState({ data: res.data, total: res.total });
        message.success(res.message)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render() {
    const { Option } = Select;
    this.state.data = [...this.state.data]

    return (
      <div>
        <Space align="center" size="large"
        style={{backgroundColor: "white",width:'100%',height:'65px',paddingLeft:'30px'}}
        >
          <div>
            火爆程度:
            <Select optionLabelProp="label" labelInValue={true} onChange={(value)=>{this.setState({popularity:value.value})}} style={{width:"80px"}}>
              <Option value={"1"}>{<HeartTwoTone twoToneColor="#eb2f96" />}X1</Option>
              <Option value={"2"}>{<HeartTwoTone twoToneColor="#eb2f96" />}X2</Option>
              <Option value={"3"}>{<HeartTwoTone twoToneColor="#eb2f96" />}X3</Option>
              <Option value={"4"}>{<HeartTwoTone twoToneColor="#eb2f96" />}X4</Option>
            </Select>
          </div>
          <div>
            商品名称:
            <Input type="primary" style={{textIndent:'0.5em',width:'150px'}} onChange={(e)=>{console.log(e);}}></Input> 
          </div>
          <div>
            商品分类:
            <Select onChange={(value)=>{console.log(value)}} style={{width:"100px"}}>
              <Option value={"代餐品"}>代餐品</Option>
              <Option value={"休闲零食"}>休闲零食</Option>
              <Option value={"日用品"}>日用品</Option>
              <Option value={"饮品"}>饮品</Option>
              <Option value={"零食"}>零食</Option>
            </Select>
          </div>
          <div>
            库存状态:
            <Select onChange={(value)=>{this.setState({inventoryStatus:value})}} style={{width:"100px"}}>
              <Option value={"1"}>充足</Option>
              <Option value={"0"}>需补货</Option>
            </Select>
          </div>
          <div>
            <Button shape="circle" type="primary" icon={<SearchOutlined />} onClick={this.search}></Button>
          </div>
          <div>
            <Button type="primary" onClick={()=>{window.location='/home/commodities/newcommodity'}}>添加商品</Button>
          </div>
        </Space>

        <div
          style={{ margin: "10px",height:'72vh', minWidth: "80vw", display:'flex', flexWrap:'wrap',overflow:'auto' }}
        >
          {this.state.data.map(ele => {
            return <Commodity key={ele._id} data={ele} total={this.state.total} />
          })}
        </div>
        
      </div>
    );
  }
}
