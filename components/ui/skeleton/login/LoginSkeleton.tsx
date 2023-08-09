"use client"
import { Skeleton, Space } from 'antd'

const LoginSkeleton = () => {
    return (
        <div>
            <Skeleton 
                active 
                title={{ style: {margin: "0 auto"}, width: "55%"}} 
                paragraph={{ rows: 0}}/>
            <Skeleton 
                active 
                title={{ style: {margin: "0 auto"}, width: "80%"}} 
                paragraph={{ rows: 0}}/>

            <Skeleton.Input active style={{ width: "100%", margin: "25px 0 15px 0"}} size="large"/>
            <Skeleton.Input active style={{ width: "100%", marginBottom: "15px"}} size="large"/>

            <Skeleton.Button active style={{ width: "100%", marginBottom: "30px"}} size="large"/>

            <Skeleton 
                active 
                title={{ style: {margin: "0 auto"}, width: "45%"}} 
                paragraph={{ rows: 0}}/>
            <Space style={{ width: "100%", margin: "0px 0 35px 0"}}>
                <Skeleton.Button style={{ width: "100%" }} active size="large"/>
                <Skeleton.Button style={{ width: "100%" }} active size="large"/>
                <Skeleton.Button style={{ width: "100%" }} active size="large"/>
            </Space>

            <Skeleton 
                active 
                paragraph={{ rows: 0 }}
                title={{ style: {margin: "0 auto"}, width: "80%"}}/>
        </div>
    )
}

export default LoginSkeleton;