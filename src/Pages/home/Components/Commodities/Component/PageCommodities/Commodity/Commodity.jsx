import React, { Component } from "react";
import { Image, Divider, Popconfirm, message, Button, Input } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { HeartTwoTone } from '@ant-design/icons';
import { httpReq } from "../../../../../../../tools/utils/httpReq";

export default class Commodity extends Component {
  //初始化状态
  state = {
    change: false,
    _id: this.props.data._id,
    cost: this.props.data.cost,
    currentPrice: this.props.data.currentPrice,
    inventory: this.props.data.inventory,
    danger_inventory: this.props.data.danger_inventory,
    sellingUnit: this.props.data.sellingUnit
  };
  changeCommodity = () => {
    const { _id,cost,currentPrice,inventory,danger_inventory,sellingUnit } = this.state
    /* const formdata = new FormData()
    formdata.append('_id',_id)
    formdata.append('cost',cost)
    formdata.append('currentPrice',currentPrice)
    formdata.append('inventory',inventory)
    formdata.append('danger_inventory',danger_inventory)
    formdata.append('sellingUnit',sellingUnit)
    httpReq('put','commodities/commodity/',formdata)
    .then(
      res => {
        message.success(res)
        console.log(res);
      },
      err => {
        message.error(err)
      } 
    ) */
    this.setState({change:false})
  }

  deleteCommodity = () => {
    const { data } = this.props;
    let { total } = this.props;
    total = total.toString();
    httpReq(
      "delete",
      `commodities/commodity/${data._id}/${total}/${data.category_id}`
    ).then(
      (res) => {
        message.success(res.msg);
        window.location.reload();
      },
      (err) => {
        message.error(err.msg);
      }
    );
  };
  render() {
    const { data } = this.props;

    return (
      <div
        style={{
          margin: "10px",
          width: "300px",
          height: "375px",
          background: "white",
          overflow: "hidden",
          paddingTop: "5px",
        }}
      >
        <div
          className="commodityImg"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Image
            preview={false}
            width={150}
            src={"data:" + data.picMimetype + ";base64," + data.file}
          />
        </div>
        <div>
          <div className="commodityName">
            <h2 style={{ textAlign: "center", marginTop: "8px" }}>
              {data.commodityName}
            </h2>
          </div>
          <div className="commodityInfo" style={{ display: "flex" }}>
            <div
              style={{ paddingLeft: "15px", fontSize: "16px", width: "50%" }}
            >
              <div>火爆: {<HeartTwoTone/>}</div>
              <Divider style={{ margin: "0" }}></Divider>
              <div>
                现价: {this.state.change?
                <Input type="primary" onChange={e=>{this.setState({currentPrice:e.target.value})}} defaultValue={data.currentPrice}
                style={{display:'inline-block',width:'50px',height:'1.5em'}}/>
                :data.currentPrice}元
              </div>
              <Divider style={{ margin: "0" }}></Divider>
              <div>
                库存: {this.state.change?
                <Input type="primary" onChange={e=>{this.setState({inventory:e.target.value})}} defaultValue={data.inventory}
                style={{display:'inline-block',width:'50px',height:'1.5em'}} />:
                data.inventory}{data.sellingUnit}
              </div>
              <Divider style={{ margin: "0" }}></Divider>
              <div>
                警戒库存: {this.state.change?
                <Input type="primary" onChange={e=>{this.setState({danger_inventory:e.target.value})}} defaultValue={data.danger_inventory}
                style={{display:'inline-block',width:'40px',height:'1.5em'}} />:
                data.danger_inventory}{data.sellingUnit}
              </div>
              <Divider style={{ margin: "0" }}></Divider>
            </div>
            <div
              style={{ paddingLeft: "15px", fontSize: "16px", width: "50%" }}
            >
              <div>分类: {data.category.categoryName}</div>
              <Divider style={{ margin: "0" }}></Divider>
              <div>
                成本: {this.state.change?
                <Input type="primary" onChange={e=>{this.setState({cost:e.target.value})}} defaultValue={data.cost}
                style={{display:'inline-block',width:'50px',height:'1.5em'}} />:
                data.cost}元
              </div>
              <Divider style={{ margin: "0" }}></Divider>
              <div>
                销量: {data.salesVolume}
                {data.sellingUnit}
              </div>
              <Divider style={{ margin: "0" }}></Divider>
              <div>售卖单位: {data.sellingUnit}</div>
              <Divider style={{ margin: "0" }}></Divider>
            </div>
          </div>
          <div
            className="commodityOPeration"
            style={{ display: "flex", marginTop: "20px", textAlign: "center" }}
          >
            {this.state.change?
            <div style={{ width: "50%", cursor: "pointer" }}><Button type="primary" onClick={()=>{this.changeCommodity()}} >提交</Button></div>:
            <div className="iconWrap" style={{ width: "50%", cursor: "pointer" }} onClick={()=>{
              this.setState({change:true})
            }}>
              <EditOutlined style={{ fontSize: "18px" }} />
            </div>}
            <Popconfirm
              title="确定删除该商品吗?"
              onConfirm={this.deleteCommodity}
              okText="确认"
              cancelText="取消"
            >
              <div className="iconWrap" style={{ width: "50%", cursor: "pointer" }}>
                <CloseOutlined style={{ fontSize: "18px" }} />
              </div>
            </Popconfirm>
          </div>
        </div>
      </div>
    );
  }
}
