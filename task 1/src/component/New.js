import React from 'react';
import { Space, Card } from 'antd';
import {HomeOutlined,} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import post from "../component/post.json";
function New(){

  let history =useHistory();
        return (
            <Space direction="vertical">
                <div>
               <span onClick={() => history.push("/")}><HomeOutlined  style={{cursor:"pointer",color:"blueviolet"}}/>Home
              </span>
              </div>
              <Card title="Detail" style={{ width: 700,margin:0,marginLeft:10,cursor:"pointer" }}>
                <h1 style={{fontSize:15}}>Course Name</h1>
                {post.map((postDetails,index) =>{
                  return<h1 style={{fontSize:15}}>{postDetails.name}<br/>{postDetails.username}</h1>
                })}
              </Card>
            </Space>
          );
}

export default New;